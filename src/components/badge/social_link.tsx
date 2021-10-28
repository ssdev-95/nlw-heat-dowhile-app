function SocialLink({ href, src }: any) {
  return (
    <a href={href} target="__blank">
      <img src={src} alt={href} />
    </a>
  )
}

export { SocialLink }