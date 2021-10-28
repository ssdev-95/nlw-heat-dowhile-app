import { useState } from 'react'
import { SocialLink } from './social_link'
import Faixa from '../../assets/faixa.svg'
import styles from './styles.module.scss'

function Badge() {
  const [user, setUser] = useState({
    name: 'Salomao S. Vasconcelos',
    bio: 'A frontend developer tha loves games and rock`nroll',
    avatar: 'https://github.com/xSallus.png',
    'social-networks': {
      github: 'xSallus',
      rocketseat: 'souza-salomao',
      instagram: 'xsallus.dev',
      linkedin: 'salomao-vasconcelos',
      zap: '5592994825428'
    }
  })

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <img src={Faixa} alt="flag" />
        <div className={styles.content}>
          <div id="profile">
            <img src="/seal.svg" alt="seal" />
            <img src={user.avatar} id="avatar" alt={user.name.replace(' ', '')} />
          </div>
          <h1>
            {user.name}
            <a
              href={`https://github.com/${user['social-networks'].github}`}
              target="__blank"
            >
              <img src="/github.svg" alt="github" />
              {user['social-networks'].github}
            </a>
          </h1>
          <p>{user.bio}</p>
          <div id="reach-me">
            <SocialLink
              src="/rocketseat.svg"
              href={`https://app.rocketseat.com.br/me/${user['social-networks'].rocketseat}`}
            />
            <SocialLink
              src="/instagram.svg"
              href={`https://instagram.com/${user['social-networks'].instagram}`}
            />
            <SocialLink
              src="/linkedin.svg"
              href={`https://linkedin.com/in/${user['social-networks'].linkedin}`}
            />
            <SocialLink
              src="/whats.svg"
              href={`https://wa.me/${user['social-networks'].zap}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Badge }