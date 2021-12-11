const { Sequelize, Model, STRING, BOOLEAN, ENUM } = require('Sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/todo', { logging: false });

class Project extends Model {};
Project.init({
  project: {
    type: STRING,
    allowNull: false
  },
  leader: {
    type: STRING,
  }
}, { sequelize, timestamps: false, modelName: 'projects' });

class Todo extends Model {};
Todo.init({
  task: {
    type: STRING,
    allowNull: false
  },
  priority: {
    type: ENUM,
    values: ['low', 'medium', 'high']
  },
  complete: {
    type: BOOLEAN,
    defaultValue: false
  }
}, { sequelize, timestamps: false, modelName: 'todos' });

Todo.belongsTo(Project);
Project.hasMany(Todo);

const syncAndSeed = async() => {
  try {
    await sequelize.sync({ force: true });
    const project1 = await Project.create({
      project: 'Annual P&Ls',
      leader: 'CV'
    });
    const task1 = await Todo.create({
      task: 'Accounting Summary',
      priority: 'medium',
      complete: false
    });
    const task2 = await Todo.create({
      task: 'Expenses',
      priority: 'high',
      complete: false
    });
    task1.update({
      projectId: project1.id
    });
    task2.update({
      projectId: project1.id
    });
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  sequelize,
  models: { Project, Todo },
  syncAndSeed
};
