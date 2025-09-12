import { Facebook, Github, Instagram, Linkedin } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {

  const socialLinkes = [
    {
      name: "Github",
      icon: <Github />,
      link: "https://github.com/CYNERZA/CYNERZA-WEB"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      link: "https://www.linkedin.com/company/cynerza"
    },
    {
      name: "Instagram",
      icon: <Instagram />,
      link: "https://www.instagram.com/cynerza/?igsh=MTg5dXAwdTlkdzBtcA%3D%3D#"
    },
    {
      name: "Facebook",
      icon: <Facebook />,
      link: "https://www.facebook.com/profile.php?id=61578860566441&rdid=JA72joEmBaBRVybF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16wZQ8oji1%2F#"
    },
  ]

  return (
    <footer className='flex flex-col justify-center bg-white text-black mx-auto px-4 sm:px-6 md:px-8 py-8'>
      {/* Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-4'>
        <div className='flex flex-col items-center justify-center space-y-1 '>
          <h2 className='text-xl sm:text-2xl text-center'>Byte Bazaar</h2>
          <p className='text-slate-400 text-center mt-2'>
            Empowering innovation through cutting-edge AI solutions.
            We make advanced technology accessible for developers and businesses worldwide.
          </p>
          <div className='flex gap-4 my-4'>
            {socialLinkes.map((social) => (
              <a className='text-gray-500 hover:text-slate-300' key={social.name} href={social.link}>{social.icon}</a>
            ))}
          </div>
        </div>

        <div className='flex flex-col items-center gap-1'>
          <h2 className='text-lg font-semibold'>Products</h2>
          <ul className='space-y-2 text-center'>
            {['AI Tools', 'API', 'Integrations', 'Enterprise', 'Pricing'].map((product, idx) => (
              <li key={idx}
                className='text-gray-500'
              >
                <Link to={`/${{ product }}`}>{product}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <h2 className='text-lg font-semibold'>Company</h2>
          <ul className='space-y-2'>
            {["About", "Careers", "Partners"].map((product, idx) => (
              <li key={idx}
                className='text-gray-500'
              >
                <Link to={`/${{ product }}`}>{product}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <h2 className='text-lg font-semibold'>Resources</h2>
          <ul className='space-y-2'>
            {["Tutorials", "Support", "Center"].map((product, idx) => (
              <li key={idx}
                className='text-gray-500'
              >
                <Link to={`/${{ product }}`}>{product}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*  */}
      <div className='border-t border-slate-600 flex flex-col md:flex-row
      justify-between items-center pt-4 px-4 space-y-2 '>
        <p className='text-slate-400'>© 2025 Byte Bazaar Technologies Inc. All rights reserved.</p>
        <div className='flex flex-wrap items-center justify-center space-x-2'>
          {["Privacy Policy", "Terms of Service", "Cookie", "Policy", "Security"]
            .map((item) => (
              <Link key={item}
                className='text-gray-500' to={`/${item}`}>
                {item}
              </Link>
            ))}
          <button className='text-gray-500 cursor-pointer'>
            ☀️ Light Mode
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
