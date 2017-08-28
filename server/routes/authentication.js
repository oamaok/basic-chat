import bcrypt from 'bcrypt';
import moment from 'moment';
import jwt from 'jsonwebtoken';

export default function authenticationRoutes(app, router) {
  const { config } = app;
  const { User } = app.models;

  function createJWT(id) {
    const exp = +moment().add(config.jwt.ttl, 'seconds').format('X');
    const token = jwt.sign({ id, exp }, config.jwt.key, { algorithm: config.jwt.algorithm });

    return token;
  }

  router
    .get('/me', async (ctx, next) => {
      await next();

      if (!ctx.user) {
        ctx.throw(403);
        return;
      }

      ctx.body = {
        token: createJWT(ctx.user.id),
        user: ctx.user,
      };
    })
    .post('/emailAvailable', async (ctx, next) => {
      await next();

      const { email } = ctx.request.body;

      if (!email) {
        ctx.throw(400, 'Email is required');
        return;
      }

      const user = await User.where({ email }).fetch();

      ctx.body = !user;
    })
    .post('/login', async (ctx, next) => {
      await next();

      const { email, password } = ctx.request.body;

      const user = await User.where({ email }).fetch();

      if (!user) {
        ctx.throw(401, 'Invalid username or password!');
        return;
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.get('password'));

      if (!isPasswordCorrect) {
        ctx.throw(401, 'Invalid username or password!');
        return;
      }

      const userObject = user.toJSON();
      delete userObject.password;

      ctx.body = {
        token: createJWT(user.id),
        user: userObject,
      };
    })
    .post('/register', async (ctx, next) => {
      await next();

      const {
        email,
        firstName,
        lastName,
        password,
      } = ctx.request.body;

      const isEmailValid = email.match(/^[^@]+@[^.]{2,}\..{2,}$/);
      const isFirstNameValid = !!firstName.length;
      const isLastNameValid = !!lastName.length;
      const isPasswordValid = password.length >= 8;

      if (!(
        isEmailValid
        && isFirstNameValid
        && isLastNameValid
        && isPasswordValid
      )) {
        ctx.throw(400, 'All fields are required');
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.forge({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        createdAt: new Date(),
      }).save();

      const userObject = user.toJSON();
      delete userObject.password;

      ctx.body = {
        token: createJWT(user.id),
        user: userObject,
      };
    });
}
