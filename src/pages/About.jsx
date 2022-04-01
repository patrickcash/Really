import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Really from '../assets/images/really.jpeg';

export default function About() {
  const [realtors, setRealtors] = useState([]);

  useEffect(() => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const getRealtors = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/realtors/`, config);
            setRealtors(res.data);
        }
        catch (err) {

        }
    };

    getRealtors();
  }, []);

  const getAllRealtors = () => {
    let allRealtors = [];
    let results = [];

    realtors.map(realtor => {
        return allRealtors.push(
            <div key={realtor.id}>
                <div className='about__display'>
                    <img className='about__display__image' src={realtor.photo} alt='' />
                </div>
                <h3 className='about__realtor'>{realtor.name}</h3>
                <p className='about__contact'>{realtor.phone}</p>
                <p className='about__contact'>{realtor.email}</p>
                <p className='about__about'>{realtor.description}</p>
            </div>
        );
    });

    for (let i = 0; i < realtors.length; i += 3) {
        results.push(
            <div key={i} className='row'>
                <div className='col-1-of-3'>
                    {allRealtors[i]}
                </div>
                <div className='col-1-of-3'>
                    {allRealtors[i+1] ? allRealtors[i+1] : null}
                </div>
                <div className='col-1-of-3'>
                    {allRealtors[i+2] ? allRealtors[i+2] : null}
                </div>
            </div>
        );
    }

    return results;
  };  

  return (
    <main className='about'>
      <Helmet>
          <title>Really Estate - About</title>
          <meta
              name='description'
              content='About us'
          />
      </Helmet>
      <header className='about__header'>
          <h1 className='about__heading'>About Really Estate</h1>
      </header>
      <section className='about__info'>
          <div className='row'>
              <h2 className='about__subheading'>We find the perfect home for you</h2>
              <p className='about__paragraph'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad labore debitis eligendi deleniti odio dolorum neque quod fugiat repellat 
                  aliquam tenetur itaque eum quaerat voluptas, commodi laborum autem aspernatur amet quae eveniet quasi consequatur expedita. Vitae 
                  aliquid atque cum quos quo saepe voluptatem doloribus tempore tempora illo optio sint voluptate facilis reprehenderit similique, 
                  delectus minima nostrum esse nihil recusandae! Obcaecati, totam pariatur, alias minima doloribus provident perspiciatis fugit vel 
                  exercitationem ab inventore animi voluptatibus dolore magnam sequi. Expedita, odit ab!
              </p>    
              <div className='about__display'>
                  <img className='about__display__image' src={Really} alt='' />
              </div>
              <p className='about__paragraph'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis quibusdam suscipit ea! Quaerat tempora quidem voluptate deserunt 
                  quod qui deleniti pariatur corporis accusantium blanditiis, officiis iure similique illo nam aliquid doloremque adipisci nihil aperiam 
                  fugiat dolorum. Aut et asperiores expedita ratione repellendus natus quam placeat aperiam incidunt, nulla itaque eum cumque? 
                  Reiciendis repudiandae commodi cum ad quos! Eius eaque rem ipsa accusamus nulla iusto! Commodi, numquam! Obcaecati eum accusamus at, 
                  quasi in quidem quia nisi ex aspernatur impedit sunt alias consequatur minus sit! Quam nobis et quod, a ad porro labore sunt 
                  voluptatibus sit temporibus tenetur, repudiandae eos amet illo inventore expedita praesentium! Iste in similique omnis consequatur 
                  illum esse magni perferendis saepe incidunt molestias, suscipit laudantium a debitis nostrum? Quo explicabo necessitatibus est facilis 
                  itaque exercitationem officiis accusantium. Ex pariatur sint ut tempore corrupti nesciunt, voluptatem dolorum, perspiciatis facere 
                  perferendis harum nemo cum dignissimos reprehenderit, quia rerum veniam dolores impedit! Eligendi cupiditate magnam modi consequatur 
                  ipsa, repellendus, voluptas aspernatur voluptatem harum iste, ex temporibus quos? Exercitationem quos vel, debitis reprehenderit eum 
                  perferendis cumque voluptas maxime eveniet sint quisquam quas blanditiis alias eaque nostrum illo ratione adipisci. Unde odio quae 
                  natus, possimus aperiam ut id aspernatur reiciendis praesentium fugit fuga.
              </p>
          </div>
      </section>
      <section className='about__team'>
          <div className='row'>
              <h2 className='about__subheading'>Meet out awesome team!</h2>
          </div>
          {getAllRealtors()}
      </section>
    </main>
  )
}
