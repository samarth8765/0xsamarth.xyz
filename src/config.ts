// Edit this file to change your intro and socials.
export type Social = { label: string; url: string }

export const site = {
  name: 'Samarth Dhawan',
  handle: '0xsamarth',
  intro: [
    "Hey, I'm Samarth, a software engineer who likes building things and writing about them.",
    'This is where I share notes, ideas, and things I learn along the way.',
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/samarth8765' },
    { label: 'X / Twitter', url: 'https://x.com/samd_twts' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/samarthdhawan2911/' },
    { label: 'Email', url: 'mailto:samdhawan8765@gmail.com' },
  ] satisfies Social[],
}
