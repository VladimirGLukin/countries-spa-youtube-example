// import { useState } from 'react';
// import { Switch, Route } from 'react-router-dom';

// import { Header } from './components/Header';
// import { Main } from './components/Main';

// import { HomePage } from './pages/HomePage';
// import { Details } from './pages/Details';
// import { NotFound } from './pages/NotFound';

// import { createGlobalStyle } from 'styled-components';

// import { sberBox } from '@salutejs/plasma-tokens/typo';
// import { darkSber } from '@salutejs/plasma-tokens/themes';


// //const TypoScale = createGlobalStyle(sberBox);
// //const Theme = createGlobalStyle(darkSber);

// function App() {
//   const [countries, setCountries] = useState([]);

//   return (
//     <>
//        {/* // Типографические константы 
//        <TypoScale /> 
//        // Тема персонажа 
//        <Theme /> */}

//       <Header />
//       <Main>
//         <Switch>
//           <Route exact path="/">
//             <HomePage countries={countries} setCountries={setCountries} />
//           </Route>
//           <Route path="/country/:name" component={Details} />
//           <Route component={NotFound} />
//         </Switch>
//       </Main>
//     </>
//   );
// }

// export default App;

import axios from 'axios';
import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import { Button, Container, Header, mediaQuery } from '@salutejs/plasma-ui';
import { background } from '@salutejs/plasma-tokens';
import { Gallery, GalleryCardEntity, GalleryControl } from '@salutejs/plasma-temple';
import { ALL_COUNTRIES } from './config';
import { Details } from './pages/Details';
import { NotFound } from './pages/NotFound';
import { Switch, Route, BrowserRouter, useHistory, Redirect } from 'react-router-dom';

const StyledContainer = styled(Container).attrs({})`
    height: 100vh;
    padding-top: 4.5rem;

    ${mediaQuery(
        'XL',
        2,
    )(css`
        padding-top: 5rem;
    `)}
`;
//left: 0;
//    z-index: 99;
    
const StyledHeader = styled(Header).attrs({})`
    top: 0;
    position: fixed;
    background: ${background};
`;

const items = Array.from(
    { length: 12 },
    (_, index) =>
        ({
            id: index,
            name: index % 2 ? 'Очень очень длинное длинное название' : 'Название',
            caption: index % 3 ? 'доп. инфо' : undefined,
            image: { src: 'images/img.png' },
            badge: { type: 'accent', content: 'Скидка 40%' },
        } as GalleryCardEntity<number>),
);

let galleries = [//[{title:string,items:[{id: number, capital:string, image:{src:string}}]}];
     { title: 'Новости', items },
 //    { title: 'Галерея 2', items },
 //    { title: 'Галерея 3', items },
 ];

export function App() {
   const galleryRef = React.useRef<GalleryControl>(null);
   const [countries, setCountries] = useState([]);
   //const { push } = useHistory();
 
   useEffect(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => {
            setCountries(data); 
            //console.log(data);
            //console.log(countries);
            // eslint-disable-next-line
            //console.log(galleries);
            // galleries.push({ title: 'Новости', items },);
            // eslint-disable-next-line
            galleries.push({title: 'Страны', items: (data as []).map((cur, ind, arr)=>(
                {
                    id: ind, 
                    name: cur.name, 
                    caption: cur.capital, 
                    badge: {type: 'critical',  content: cur.region, position:'bottomRight'}, 
                    image: {src: cur.flags.png, ratio:'16/9'}}))});
                    // galleries.push({title: 'Страны', {data.map((_,index) => (
                    //     ({
                    //         id: index,
                    //         name: countries[index].name,
                    //         caption: countries[index].capital,
                    //         image: { src: countries[index].flags.png, },
                    //         badge: { type: 'accent', content: 'Скидка 40%' },
                    //     } as GalleryCardEntity<number>),
                    // ))})
            setCountries(data); 
            // eslint-disable-next-line
            galleries.push({title: 'Азия', items: (data as []).map((cur, ind, arr)=>(
                {
                    id: ind, 
                    name: cur.name, 
                    caption: cur.capital, 
                    badge: {type: 'critical',  content: cur.region, position:'bottomRight'}, 
                    image: {src: cur.flags.png, ratio:'16/9'}}))});
        });
    // eslint-disable-next-line
  }, []);

    //             <HomePage countries={countries} setCountries={setCountries} />
    /*
                            //onCardClick={() => {
                            //console.log('card clicked');
                                //    push(`/country/${c.name}`
                            //}}
                            */
    return (
        <StyledContainer>
            <BrowserRouter>
                <Switch>
                <Route exact path="/">
                        <StyledHeader 
                                back={true}
                                logo="telegram.svg"
                                logoAlt="Logo"
                                title="Header title text"
                                subtitle="Subtitle text"
                                onBackClick={() => console.log('Back click!')}
                            >{galleries.map((_, index) => (
                                <Button
                                    key={index}
                                    size="s"
                                    style={{ marginRight: '0.5rem' }}
                                    onClick={() => galleryRef.current.setActiveGallery(index)}
                                >{galleries[index].title}
                                </Button>
                            ))}
                        </StyledHeader>
                        <Gallery
                            ref={galleryRef}
                            items={galleries}
                            autoFocus                            
                            onCardClick={(cardEntity: GalleryCardEntity, galleryIndex: number, cardIndex: number) => {
                                console.log(cardEntity);
                                console.log(galleryIndex);
                                console.log(cardIndex); 
                                //<Details name={cardEntity.name} />   
                                //console.log(push);
                                
                            }}
                        />
                </Route>
                <Route path="/country/:name" component={Details} />
                <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </StyledContainer>
    );
}

export default App;
