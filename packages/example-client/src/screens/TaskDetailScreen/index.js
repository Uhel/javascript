import React from 'react';
import { compose, pure } from 'recompose';

const withTaskDetailScreen = compose(pure);

const renderTaskDetailScreen = () => {
	return <div>TaskDetailScreen</div>;
};

const TaskDetailScreen = withTaskDetailScreen(renderTaskDetailScreen);

export default TaskDetailScreen;
