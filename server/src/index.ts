import 'reflect-metadata'
import {createKoaServer, Action, BadRequestError} from 'routing-controllers'
import EventController from './events/controller'
import TicketController from './tickets/controller'
import CommentController from "./comments/controller";
import UsersController from './users/controller'
import LoginController from './logins/controller'
import setupDb from './db'
import { verify } from './jwt';
import User from './users/entity';

const app = createKoaServer({
  cors: true,
  controllers: [
    EventController,
    TicketController,
    CommentController,
    UsersController,
    LoginController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      
      if (token) {
        const {id} = verify(token)
        return User.findOne(id)
      }
    }
    return undefined
  }
});


setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))




