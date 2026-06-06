import React from 'react'
import styles from './ContactSection.module.scss'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ContactForm from '@/Components/UI/Forms/ContactForm'
import Paper from '@mui/material/Paper'
import ContactInfo from '@/Components/UI/Footer/ContactInfo'
import SocialWrapper from '@/Components/UI/Footer/SocialWrapper'
export default function ContactSection({title, description, map, contactInfo, uspData, socialData}) {
  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="lg" className={`${styles.container} contact-info-wrapper grid`}>
                <div className={`${styles.contactWraper}`}>
                    <Typography variant="h2" component="h1" className="">
                        {title}
                        </Typography>
                        <Typography variant="subtitle1" component="p" className="mt-8">
                        {description}
                        </Typography>
                        <div className={`${styles.contactInfo} mt-8`}>
                        <ContactInfo contactInfo={contactInfo} />
                        </div>
                        <div className={`${styles.socialWrapper} mt-8`}>
                            <SocialWrapper socialData={socialData} />
                            </div>

                </div>
                <Paper className={`${styles.contactFormWrapper}`} variant='outlined'>
                    <ContactForm/> 

                    </Paper> 

                    
      </Container>
      
      <div dangerouslySetInnerHTML={{ __html: map }} className='mt-40'/> 
    </section>
  )
}
