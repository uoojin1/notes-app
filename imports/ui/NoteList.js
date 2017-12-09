import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
//API
import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import Sortable from 'react-drag-sort';

export class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: props.notes,
            searchKey: '',
        };
    }
    searchBox() {
        return <input className="search-box" type="text" onChange={this.handleSearch.bind(this)} value={this.state.searchKey} placeholder="Search"/>
    }
    handleSearch(e) {
        const searchKey = e.target.value;
        this.setState({searchKey});
    }
    
    render() {
        return (
            <div className="side-content">
                <NoteListHeader/>
                { this.searchBox() }
                <div id="note-list" className="item-list">
                    { this.props.notes.length === 0 ? <NoteListEmptyItem/> : undefined}
                    { 
                        this.props.notes.map((note) => {
                            console.log(this.props.notes);
                            if(note.title.toLowerCase().includes(this.state.searchKey.toLowerCase()) ||
                                note.body.toLowerCase().includes(this.state.searchKey.toLowerCase())){
                                    return <NoteListItem key={note._id} note={note}/>;
                            }
                        }) 
                    }
                </div>
            </div>
        );
    }
};

NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired,
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    Meteor.subscribe('notes');

    return {
        notes: Notes.find({}, {
            sort: {
                updatedAt: -1
            }
        }).fetch().map((note) => {
            return {
                ...note,
                selected: note._id === selectedNoteId
            };
        })
    };

}, NoteList);