import { idFromJWT } from '../utilities';

export default function authentication(app) {
  const { User } = app.models;

  app.use(async (ctx, next) => {
    const token = ctx.request.headers.authorization;
    Object.assign(ctx, { token, user: null });

    const id = idFromJWT(
      token,
      app.config.jwt.key,
      app.config.jwt.algorithm
    );

    if (!id) {
      await next();
      return;
    }

    const userObj = await User.where({ id }).fetch();
    const user = userObj.toJSON();

    delete user.password;

    Object.assign(ctx, { user });

    await next();
  });
}
