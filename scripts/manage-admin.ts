import { argv } from 'process';
import Joi from 'joi';
import { v4 as uuid } from 'uuid';
import { PrismaClient } from '@prisma/client';
import logger from '../src/helpers/logger.helper';
import { hashPassword } from '../src/helpers/password.helper';
import { signAccessToken, signRefreshToken } from '../src/helpers/jwt.helper';
/**
 * This script is create to specially manage admins
 * @argument --action <Action to perform on admin (create | update | delete)>
 * @argument --name <Name of admin>
 * @argument --email <Email of admin>
 * @argument --password <Password of admin>
 */
(async () => {
  console.log('\n⚙👷🏽‍♂️ MANAGE ADMIN \n\n');
  // index of arguments
  const actionIdx = argv.indexOf('--action');
  const nameIdx = argv.indexOf('--name');
  const emailIdx = argv.indexOf('--email');
  const passwordIdx = argv.indexOf('--password');
  // values of arguments
  const actionVal = argv[actionIdx + 1];
  const nameVal = argv[nameIdx + 1];
  const emailVal = argv[emailIdx + 1];
  const passwordVal = argv[passwordIdx + 1];

  const actions = ['create', 'update', 'delete'];

  if (actionIdx === -1 || !actionVal || actions.indexOf(actionVal) === -1)
    return logger.error(`Provide a valid action. Use --action <${actions.join(' | ')}>`);

  // CREATE ADMIN
  if (actionVal === 'create') {
    logger.info('ℹ Attempting to perform an admin CREATE action');
    if (nameIdx === -1 || !nameVal) return logger.error('Provide admin name. Use --name <value>');
    if (emailIdx === -1 || !emailVal) return logger.error('Provide admin email. Use --email <value>');
    if (passwordIdx === -1 || !passwordVal) return logger.error('Provide admin password. Use --password <value>');

    const createAdminInputSchema = Joi.object({
      name: Joi.string().min(3).max(128).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(15).required(),
    });

    const adminToCreate = { name: nameVal, email: emailVal, password: passwordVal };

    const validated = createAdminInputSchema.validate(adminToCreate);

    if (validated?.error?.details) {
      return logger.error('❗ Validation failed: ', validated.error.details);
    }

    const prisma = new PrismaClient();

    try {
      const foundAdmin = await prisma.admin.findFirst({ where: { email: emailVal } });
      if (foundAdmin) return logger.error('❗ Admin already exists');
      const newAdmin = {
        id: uuid(),
        ...adminToCreate,
      };
      const hashedPassword = await hashPassword(newAdmin.password);
      // replace new admin password with hashed password
      newAdmin.password = hashedPassword;
      // save admin to database
      const savedAdmin = await prisma.admin.create({
        data: newAdmin,
      });
      // hashed password should not be sent to client
      Reflect.deleteProperty(savedAdmin, 'password');

      // sign a new access and refresh token for saved admin
      const accessToken = await signAccessToken({ adminId: savedAdmin.id });
      const refreshToken = await signRefreshToken({ adminId: savedAdmin.id });
      return logger.success(
        '✅ Admin created successfully: ',
        JSON.stringify({
          accessToken,
          refreshToken,
          admin: savedAdmin,
        }),
      );
    } catch (err) {
      return logger.error('❌ Could not create admin: ', err);
    }
  }

  // UPDATE ADMIN
  if (actionVal === 'update') {
    logger.info('ℹ Attempting to perform an admin UPDATE action');

    return logger.infoBg('Update feature is not available😔.  Coming soon!😎');
  }

  // DELETE ADMIN
  if (actionVal === 'update') {
    logger.info('ℹ Attempting to perform an admin DELETE action');

    return logger.infoBg('Delete feature is not available😔.  Coming soon!😎');
  }
})();
