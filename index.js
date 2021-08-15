import app from './src/app';
import { sequelize } from './src/config/database';

sequelize.sync({ force: true });

app.listen(3000, () => console.log('app is running'));
