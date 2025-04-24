import React from 'react';
import TimelineBlock from './components/TimeLineBlock/TimeLineBlock';


interface YearEvent {
  year: number | string;
  description: string;
}

interface TimelineTheme {
  label: string; 
  value: string; 
  events: YearEvent[]; 
}


interface TimePeriodDefinition {
  startYear: number;
  endYear: number;
}


const themesData: TimelineTheme[] = [
  {
    label: 'Литература',
    value: 'literature',
    events: [
      { year: 2003, description: 'Событие Литература 2003...' },
      { year: 2004, description: 'Событие Литература 2004...' },
      { year: 2005, description: 'Событие Литература 2005...' },
      { year: 2006, description: 'Событие Литература 2006...' },
      { year: 2007, description: 'Событие Литература 2007...' },
      { year: 2008, description: 'Событие Литература 2008...' },
      { year: 2009, description: 'Событие Литература 2009...' },
      { year: 2010, description: 'Событие Литература 2010...' },
      { year: 2011, description: 'Событие Литература 2011...' },
      { year: 2012, description: 'Событие Литература 2012...' },
      { year: 2013, description: 'Событие Литература 2013...' },
      { year: 2014, description: 'Событие Литература 2014...' },
      { year: 2015, description: 'Событие Литература 2015...' },
      { year: 2016, description: 'Событие Литература 2016...' },
      { year: 2017, description: 'Событие Литература 2017...' },
      { year: 2018, description: 'Событие Литература 2018...' },
      { year: 2019, description: 'Событие Литература 2019...' },
      { year: 2020, description: 'Событие Литература 2020...' },
      { year: 2021, description: 'Событие Литература 2021...' },
      { year: 2022, description: 'Событие Литература 2022...' },
    ],
  

  },
  {
    label: 'Кино',
    value: 'cinema',
    events: [
      { year: 2003, description: 'Фильм 2003...' },
      { year: 2004, description: 'Фильм 2004...' },
      { year: 2005, description: 'Фильм 2005...' },
      { year: 2006, description: 'Фильм 2006...' },
      { year: 2007, description: 'Фильм 2007...' },
      { year: 2008, description: 'Фильм 2008...' },
      { year: 2009, description: 'Фильм 2009...' },
      { year: 2010, description: 'Фильм 2010...' },
      { year: 2011, description: 'Фильм 2011...' },
      { year: 2012, description: 'Фильм 2012...' },
      { year: 2013, description: 'Фильм 2013...' },
      { year: 2014, description: 'Фильм 2014...' },
      { year: 2015, description: 'Фильм 2015...' },
      { year: 2016, description: 'Фильм 2016...' },
      { year: 2017, description: 'Фильм 2017...' },
      { year: 2018, description: 'Фильм 2018...' },
      { year: 2019, description: 'Фильм 2019...' },
      { year: 2020, description: 'Фильм 2020...' },
      { year: 2021, description: 'Фильм 2021...' },
      { year: 2022, description: 'Фильм 2022...' },
      
      
    ],
  },
  {
    label: 'Музыка',
    value: 'music',
    events: [
      { year: 2003, description: 'Альбом 2003...' },
      { year: 2004, description: 'Альбом 2004...' },
      { year: 2005, description: 'Альбом 2005...' },
      { year: 2006, description: 'Альбом 2006...' },
      { year: 2007, description: 'Альбом 2007...' },
      { year: 2008, description: 'Альбом 2008...' },
      { year: 2009, description: 'Альбом 2009...' },
      { year: 2010, description: 'Альбом 2010...' },
      { year: 2011, description: 'Альбом 2011...' },
      { year: 2012, description: 'Альбом 2012...' },
      { year: 2013, description: 'Альбом 2013...' },
      { year: 2014, description: 'Альбом 2014...' },
      { year: 2015, description: 'Альбом 2015...' },
      { year: 2016, description: 'Альбом 2016...' },
      { year: 2017, description: 'Альбом 2017...' },
      { year: 2018, description: 'Альбом 2018...' },
      { year: 2019, description: 'Альбом 2019...' },
      { year: 2020, description: 'Альбом 2020...' },
      { year: 2021, description: 'Альбом 2021...' },
      { year: 2022, description: 'Альбом 2022...' },
    ],
  },
  {
    label: 'Наука',
    value: 'science',
    events: [
      { year: 2003, description: 'Открытие 2003...' },
      { year: 2004, description: 'Открытие 2004...' },
      { year: 2005, description: 'Открытие 2005...' },
      { year: 2006, description: 'Открытие 2006...' },
      { year: 2007, description: 'Открытие 2007...' },
      { year: 2008, description: 'Открытие 2008...' },
      { year: 2009, description: 'Открытие 2009...' },
      { year: 2010, description: 'Открытие 2010...' },
      { year: 2011, description: 'Открытие 2011...' },
      { year: 2012, description: 'Открытие 2012...' },
      { year: 2013, description: 'Открытие 2013...' },
      { year: 2014, description: 'Открытие 2014...' },
      { year: 2015, description: 'Открытие 2015...' },
      { year: 2016, description: 'Открытие 2016...' },
      { year: 2017, description: 'Открытие 2017...' },
      { year: 2018, description: 'Открытие 2018...' },
      { year: 2019, description: 'Открытие 2019...' },
      { year: 2020, description: 'Открытие 2020...' },
      { year: 2021, description: 'Открытие 2021...' },
      { year: 2022, description: 'Открытие 2022...' },
      
      
    ],
  },
  {
    label: 'Технологии',
    value: 'technology',
    events: [
      { year: 2003, description: 'Гаджет 2003...' },
      { year: 2004, description: 'Гаджет 2004...' },
      { year: 2005, description: 'Гаджет 2005...' },
      { year: 2006, description: 'Гаджет 2006...' },
      { year: 2007, description: 'Гаджет 2007...' },
      { year: 2008, description: 'Гаджет 2008...' },
      { year: 2009, description: 'Гаджет 2009...' },
      { year: 2010, description: 'Гаджет 2010...' },
      { year: 2011, description: 'Гаджет 2011...' },
      { year: 2012, description: 'Гаджет 2012...' },
      { year: 2013, description: 'Гаджет 2013...' },
      { year: 2014, description: 'Гаджет 2014...' },
      { year: 2015, description: 'Гаджет 2015...' },
      { year: 2016, description: 'Гаджет 2016...' },
      { year: 2017, description: 'Гаджет 2017...' },
      { year: 2018, description: 'Гаджет 2018...' },
      { year: 2019, description: 'Гаджет 2019...' },
      { year: 2020, description: 'Гаджет 2020...' },
      { year: 2021, description: 'Гаджет 2021...' },
      { year: 2022, description: 'Гаджет 2022...' },

    ],
  },
  {
    label: 'Искусство',
    value: 'art',
    events: [
      { year: 2003, description: 'Выставка 2003...' },
      { year: 2004, description: 'Выставка 2004...' },
      { year: 2005, description: 'Выставка 2005...' },
      { year: 2006, description: 'Выставка 2006...' },
      { year: 2007, description: 'Выставка 2007...' },
      { year: 2008, description: 'Выставка 2008...' },
      { year: 2009, description: 'Выставка 2009...' },
      { year: 2010, description: 'Выставка 2010...' },
      { year: 2011, description: 'Выставка 2011...' },
      { year: 2012, description: 'Выставка 2012...' },
      { year: 2013, description: 'Выставка 2013...' },
      { year: 2014, description: 'Выставка 2014...' },
      { year: 2015, description: 'Выставка 2015...' },
      { year: 2016, description: 'Выставка 2016...' },
      { year: 2017, description: 'Выставка 2017...' },
      { year: 2018, description: 'Выставка 2018...' },
      { year: 2019, description: 'Выставка 2019...' },
      { year: 2020, description: 'Выставка 2020...' },
      { year: 2021, description: 'Выставка 2021...' },
      { year: 2022, description: 'Выставка 2022...' },
      
      
    ],
  },
];


const timePeriods: TimePeriodDefinition[] = [
  { startYear: 2003, endYear: 2008 },
  { startYear: 2009, endYear: 2014 },
  { startYear: 2015, endYear: 2022 },
];

const App: React.FC = () => {
  return (
    <div>
     
      <TimelineBlock themes={themesData} timeRanges={timePeriods} />
    </div>
  );
};

export default App;