import React from 'react';
// import { createContainer } from 'meteor/react-meteor-data';

const NoteListEmptyItem = (props) => {
    return (
        <div>
            <h5>You don't have any notes</h5>
            <p>Create a note to get started!</p>
        </div>
    );
};

export default NoteListEmptyItem;