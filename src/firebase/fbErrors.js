export const verifyErrors = code => {
  const errors = {}
  switch (code) {
    case 'auth/invalid-email':
      errors.email = 'E-mail inválido'
      break
    case 'auth/user-not-found':
      errors.email = 'Não existe usuário com o endereço de email fornecido.'
      break
    case 'auth/email-already-in-use':
      errors.email = 'Já existi uma conta com o endereço de email fornecido.'
      break
    case 'auth/wrong-password':
      errors.password = 'Senha incorreta'
      break
    case 'auth/weak-password':
      errors.password =
        'A senha é inválida, precisa ter pelo menos 6 caracteres.'
      break
    default:
      errors.alert = 'Ocorreu um erro ao efetuar a requisição. Tente novamente'
      break
  }
  return errors
}
