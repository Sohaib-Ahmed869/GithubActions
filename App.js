const express = require('express');
const TaskRouter = require('./Routes/Tasks');
const UserRouter = require('./Routes/User');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/tasks', TaskRouter);
app.use('/users', UserRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);

