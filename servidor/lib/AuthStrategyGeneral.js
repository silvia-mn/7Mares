import {Strategy as LocalStrategy} from 'passport-local' 
import Administrador from '../models/administrador.model.js'
import Empresa from '../models/empresa.model.js'
import Cliente from '../models/cliente.model.js'


export const strategyInitGeneral = passport => {
  passport.use('localGeneral',
  new LocalStrategy({
    usernameField: 'rolEmail',
    passwordField: 'password'
  },
  // Lógica a la que llegará Passport cuando haga el authenticate (login)
  (rolEmail, password, done) => {
    const re = JSON.parse(rolEmail);
    const rol = re.rol;
    const email = re.email;
    if (rol==="admin"){
      Administrador.query().findOne({email: email}).then(user => {
          if (!user) return done(null, false, {err: 'Administrador desconocido'}); // Si el Administrador no existe, devolver callback con error
          user.verifyPassword(String(password), ((err, passwordIsCorrect) => { // Si existe, validar contraseña
            if (!!err) return done(err); // Si la validación contiene error, devolver callback con error
            if (!passwordIsCorrect) return done(null, false); // Si la contraseña no es válida, devolver callback sin Administrador
            return done(null, {...user,rol:'admin'}); // Si la contraseña es válida, devolver callback con Administrador
          }));
        }).catch(function (err) {
          done(err) // Si se captura alguna excepción no controlada, devolver callback con error
        });
    }else if (rol ==="cliente"){
      Cliente.query().findOne({email: email}).then(user => {
        if (!user) return done(null, false, {err: 'Usuario desconocido'}); // Si el usuario no existe, devolver callback con error
        user.verifyPassword(String(password), ((err, passwordIsCorrect) => { // Si existe, validar contraseña
          if (!!err) return done(err); // Si la validación contiene error, devolver callback con error
          if (!passwordIsCorrect) return done(null, false); // Si la contraseña no es válida, devolver callback sin usuario
          return done(null, {...user,rol:'cliente'}); // Si la contraseña es válida, devolver callback con usuario
        }))
      }).catch(function (err) {
        done(err) // Si se captura alguna excepción no controlada, devolver callback con error
      });
    }else if (rol === "empresa"){
      Empresa.query().findOne({email: email}).then(user => {
        if (!user) return done(null, false, {err: 'Empresa desconocida'}); // Si la empresa no existe, devolver callback con error
        user.verifyPassword(String(password), ((err, passwordIsCorrect) => { // Si existe, validar contraseña
          if (!!err) return done(err); // Si la validación contiene error, devolver callback con error
          if (!passwordIsCorrect) return done(null, false); // Si la contraseña no es válida, devolver callback sin usuario
          return done(null, {...user,rol:'empresa'}); // Si la contraseña es válida, devolver callback con empresa
        }))
      }).catch(function (err) {
        done(err) // Si se captura alguna excepción no controlada, devolver callback con error
      })
    }else{
      done({error:"rol invalido"});
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
}


export default strategyInitGeneral;

