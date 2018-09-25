import React from 'react';
import { compose, pure } from 'recompose';

const withTasksScreen = compose(pure);

const renderTasksScreen = () => {
	return <div>TasksScreen</div>;
};

const TasksScreen = withTasksScreen(renderTasksScreen);

export default TasksScreen;
