import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import styles from './TimelineBlock.module.scss';
import SwiperCore from 'swiper';
import { useSwiper } from 'swiper/react';


import arrowLeftUrl from '../../../public/images/arrowRight.png'; // Относительный путь от TSX к public/images
import arrowRightUrl from '../../../public/images/arrowLeft.png';
import arrowSliderUrl from '../../../public/images/arrowSlider.png'; // <-- Новая стрелка слайдера


interface YearEvent { year: number | string; description: string; }
interface TimelineTheme { label: string; value: string; events: YearEvent[]; }
interface TimePeriodDefinition { startYear: number; endYear: number; }


interface TimelineBlockProps {
  themes: TimelineTheme[];
  timeRanges: TimePeriodDefinition[];
}

const TimelineBlock: React.FC<TimelineBlockProps> = ({ themes, timeRanges }) => {
  const [activeThemeIndex, setActiveThemeIndex] = useState(0); 
  const [activePeriodIndex, setActivePeriodIndex] = useState(0); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const circleRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperCore | null>(null); 

  
  console.log('Component Render - activePeriodIndex:', activePeriodIndex);

  if (timeRanges.length !== 3 || themes.length !== 6) { 
    console.error('TimelineBlock ожидает 3 периода и 6 тем');
    return null;
  }


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
 
    handleResize(); 

   
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
   
    if (valueRef.current && !isMobile) { 
      gsap.fromTo(
        valueRef.current,
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    } else if (valueRef.current && isMobile) {
        // На мобильных  устанавливаем начальное состояние без анимации
        gsap.set(valueRef.current, { opacity: 1, y: 0 });
    }
    // Зависимость от isMobile тоже, чтобы сбросить стиль при ресайзе
  }, [activePeriodIndex, isMobile]); 

 
  useEffect(() => {
    if (circleRef.current && sliderRef.current && !isMobile) { // Добавил !isMobile для анимации слайдера
      const dots = circleRef.current.querySelectorAll(`.${styles.timelineDot}`);
      // Убираем анимацию GSAP для точек
      /*
      dots.forEach((dot, index) => {
        gsap.to(dot, {
          scale: index === activeThemeIndex ? 1.5 : 1, // Убираем
          backgroundColor: index === activeThemeIndex ? '#9DBEFD' : '#42567A', // Убираем
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      */

     
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    } else if (sliderRef.current && isMobile) {
        // На мобильных  устанавливаем начальное состояние без анимации
        gsap.set(sliderRef.current, { opacity: 1, x: 0 });
    }
  }, [activeThemeIndex, isMobile]); 

  const handleThemeChange = (index: number) => {
    
     if (sliderRef.current) {
        gsap.to(sliderRef.current, { opacity: 0, duration: 0.25, onComplete: () => {
            setActiveThemeIndex(index);
            gsap.fromTo(sliderRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 });
        }});
     } else {
        setActiveThemeIndex(index);
     }
  };

  const calculateDotPosition = (index: number, total: number) => {
    let angle = (360 / total) * index; 

    const radius = isMobile ? 125 : 265; 

    // Корректируем угол 
    if (index === 0) { angle += 0.5; } 
    else if (index === 3) { angle -= 0.5; } 

    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  
  const handlePrevPeriod = () => {
  
    console.log('handlePrevPeriod called'); 
    setActivePeriodIndex((prev) => {
        const next = prev === 0 ? timeRanges.length - 1 : prev - 1;
        console.log('Setting activePeriodIndex to:', next); 
        return next;
    });
  };

  const handleNextPeriod = () => {
    console.log('handleNextPeriod called'); 
     setActivePeriodIndex((prev) => {
        const next = prev === timeRanges.length - 1 ? 0 : prev + 1;
        console.log('Setting activePeriodIndex to:', next); 
        return next;
     });
  };
  

  const handleSliderNext = () => {
    swiperRef.current?.slideNext(); 
  };

  
  const currentThemeEvents = themes[activeThemeIndex].events;
  const currentPeriod = timeRanges[activePeriodIndex];
  const filteredEvents = currentThemeEvents.filter(event => {
      const year = Number(event.year); 
      return year >= currentPeriod.startYear && year <= currentPeriod.endYear;
  });

  return (
    <div 
      className={styles.timelineBlock}
      style={{
        '--arrow-left-url': `url(${arrowLeftUrl})`,
        '--arrow-right-url': `url(${arrowRightUrl})`,
      } as React.CSSProperties}
    >
     
      <div className={styles.leftBorderLine}></div>
      <div className={styles.rightBorderLine}></div>
      
      
      <h1 className={styles.timelineTitle}>Исторические даты</h1>
      
    
      {isMobile ? (
        // Мобилка: Блок годов 
        <>
          <div className={styles.circleValue} ref={valueRef}>
              <span className={styles.startYear}>{timeRanges[activePeriodIndex].startYear}</span>
              <span className={styles.endYear}>{timeRanges[activePeriodIndex].endYear}</span>
          </div>
          <div className={styles.mobileDivider}></div>
        </>
      ) : (
        // Десктоп: Блок с кругом
        <div className={styles.timelineCenter}>
            <div className={styles.timelineCircle} ref={circleRef}>
                {/* Блок годов для десктопа внутри круга */}
                <div className={styles.circleValue} ref={valueRef}> 
                     <span className={styles.startYear}>{timeRanges[activePeriodIndex].startYear}</span>
                     <span className={styles.endYear}>{timeRanges[activePeriodIndex].endYear}</span>
                </div>
                {/* Точки навигации тем (скрываем на мобильных) */}
                {themes.map((theme, index) => { 
                  const { x, y } = calculateDotPosition(index, themes.length);
                  const dotClassName = `${styles.timelineDot} ${index === activeThemeIndex ? styles.active : ''}`;

                  let angle = (360 / themes.length) * index;
                  if (index === 0) { angle += 5.5; } 
                  else if (index === 3) { angle -= 5.5; } 
                  const angleRad = angle * Math.PI / 180;

                  const dotRadius = 28; 
                  const baseGap = 20; 
                  const extraGap = 42; 
                  const centerToDotCenter = isMobile ? 125 : 265; 

                  let labelDistanceFromCenter = centerToDotCenter + dotRadius + baseGap; 
                  if (index === 0 || index === 3) {
                      labelDistanceFromCenter += extraGap; 
                  }

                  const labelX = Math.cos(angleRad) * labelDistanceFromCenter;
                  const labelY = Math.sin(angleRad) * labelDistanceFromCenter;

                  return (
                    <React.Fragment key={theme.value}>
                      <div
                        className={dotClassName}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                        }}
                        onClick={() => handleThemeChange(index)}
                        role="button"
                        aria-label={`Выбрать тему ${theme.label}`}
                      >
                        <span className={styles.dotLabel}>{index + 1}</span>
                      </div>
                     
                      {index === activeThemeIndex && (
                        <span 
                          className={styles.themeLabel}
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                           
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`
                          }}
                        >
                          {theme.label}
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
        </div>
      )}
      {/* ======================================================== */}

      {/* Блок навигации по периодам для десктопа*/}
      {!isMobile && ( 
          <div className={styles.navigationControls}> 
              <span className={styles.periodCounter}>
                  {`${String(activePeriodIndex + 1).padStart(2, '0')}/${String(timeRanges.length).padStart(2, '0')}`}
              </span>
              <div className={styles.arrowButtons}>
                  <button className={`${styles.arrowButton} ${styles.arrowButtonLeft}`} onClick={handlePrevPeriod} aria-label="Предыдущий период">
                     <img src={arrowLeftUrl} alt="" style={{ display: 'none' }} />
                  </button>
                  <button className={`${styles.arrowButton} ${styles.arrowButtonRight}`} onClick={handleNextPeriod} aria-label="Следующий период">
                     <img src={arrowRightUrl} alt="" style={{ display: 'none' }} />
                  </button>
              </div>
          </div>
      )}

      {/* Контейнер для слайдера */} 
      <div className={styles.sliderContainer}>
        <div className={styles.timelineSlider} ref={sliderRef}>
          <Swiper
            
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Pagination]} 
            spaceBetween={80} 
            slidesPerView={3}
            breakpoints={{
           
              320: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 40, 
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 80, 
              },
            }}
            // Пагинации без el для мобильных
            pagination={isMobile ? { 
              clickable: true,
            } : false} // Отключаем пагинацию на десктопе
          >
         
            {filteredEvents.map((event, index) => (
              <SwiperSlide key={`${themes[activeThemeIndex].value}-${event.year}-${index}`} className={styles.swiperSlide}>
                <div className={styles.eventCard}>
              
                  <h3 className={styles.eventTitle}>{event.year}</h3> 
                
                  <p className={styles.eventDescription}>{event.description}</p>
                </div>
              </SwiperSlide>
            ))}

             {filteredEvents.length === 0 && (
                <div className={styles.noEvents}>Нет событий для выбранной темы в данном периоде.</div>
             )}
          </Swiper>
        </div>
       
        {/* Десктопная кнопка "Next" для слайдера */}
        {!isMobile && (
            <button
              className={styles.customNextButton}
              onClick={handleSliderNext}
              aria-label="Следующий слайд"
            >
              <img src={arrowSliderUrl} alt="" />
            </button>
        )}
      </div>

      {/*Контейнер для управления и пагинации на мобильных */}
      {isMobile && ( 
          <div className={styles.mobileBottomRow}> 
              {/* Блок навигации по периодам для мобильных */} 
              <div className={styles.navigationControls}> 
                   <span className={styles.periodCounter}>
                       {`${String(activePeriodIndex + 1).padStart(2, '0')}/${String(timeRanges.length).padStart(2, '0')}`}
                   </span>
                   <div className={styles.arrowButtons}>
                       <button className={`${styles.arrowButton} ${styles.arrowButtonLeft}`} onClick={handlePrevPeriod} aria-label="Предыдущий период">
                       
                       </button>
                       <button className={`${styles.arrowButton} ${styles.arrowButtonRight}`} onClick={handleNextPeriod} aria-label="Следующий период">
                          
                       </button>
                   </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default TimelineBlock;