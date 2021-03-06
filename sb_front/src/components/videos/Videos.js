import React from 'react';
import styled, { css } from 'styled-components';
import Responsive from '../common/Responsive.js';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes.js';
import palette from '../common/palette.js';

const VideoBlock = styled(Responsive)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  a{
    margin:0 auto;
    margin-bottom:20px;
  }
  @media (max-width: 630px) {
    width: 600px;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }
`;
const Wrapper = styled(Link)`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  background:${palette.toneDownWhite};
  border-radius:6px;
`;
const Title = styled.span`
  color: ${palette.black};
  margin-top:6px;
`;
const Img = styled.img`
  position: relative;
`;
const Duration = styled.span`
  position: absolute;
  color: ${palette.white};
  transform: translateY(158px);
  background: rgba(0, 0, 0, 0.7);
  letter-spacing: 0.5px;
`;
const Sub = styled.span`
margin:10px 10px;
  display: flex;
  flex-direction:column;
  justify-content: center;
  div {
    display: flex;
    justify-content: space-between;
  }
`;
const View = styled.span`
  color: rgba(0, 0, 0, 0.7);
`;
const PublishedAt = styled.span`
  color: rgba(0, 0, 0, 0.7);

  ${(props) =>
    props.toYes &&
    css`
      color: ${palette.yellow};
      animation: blink 0.8s ease-in-out infinite alternate;
      @keyframes blink {
        0% {
          opacity: 0.2;
        }
        100% {
          opacity: 1;
        }
      }
    `}
`;

const getYesMonth = ({ date, month }) => {
  if (date === '01' && month === '01') {
    return '12';
  } else if (date === '01' && month < 10) {
    return '0' + Number(month - 1);
  } else if (date === '01' && month > 10) {
    return month - 1;
  } else {
    return month;
  }
};

const is30DayMonth = (month) => '05,07,10,12'.indexOf(month) >= 0;

const getYesDate = ({ date, month }) => {
  if (date > 10) {
    return date - 1;
  } else if (date > 1) {
    return '0' + Number(date - 1);
  } else if (is30DayMonth(month)) {
    return '30';
  } else if (month === '03') {
    return '28';
  } else {
    return '31';
  }
};

const Videos = ({ videoDetail, error }) => {
  const YMD = new Date();
  const setMonth = YMD.getMonth() + 1;
  const setDate = YMD.getDate();
  const year = YMD.getFullYear();

  const month = setMonth < 10 ? '0' + setMonth : setMonth;
  const date = setDate < 10 ? '0' + setDate : setDate;

  const yesMonth = getYesMonth({ month, date });
  const yesDate = getYesDate({ month, date });

  const yesYear = date === '01' && month === '01' ? year - 1 : year;

  const today = `${year}-${month}-${date}`;

  const yesterday = `${yesYear}-${yesMonth}-${yesDate}`;

  return (
    <>
      {error ? (
        <div style={{ color: `${palette.toneDownWhite}`, 'text-align': 'center' }}>
          에러 발생
        </div>
      ) : (
        <VideoBlock>
          {videoDetail &&
            videoDetail.map((Info) => (
              <Wrapper
                to={`${routes.watch}?video=${Info.videoId}&num=${Info.id}`}
                key={Info.id}
              >
                <Img src={Info.medium.url} alt="" />
                <Duration>{Info.duration.slice(2, 20)}</Duration>
                <Sub>
                  <div>
                    {[today, yesterday].indexOf(
                      Info.publishedAt.split('T')[0],
                    ) >= 0 ? (
                      <PublishedAt toYes>
                        {Info.publishedAt.split('T')[0]}
                      </PublishedAt>
                    ) : (
                      <PublishedAt>
                        {Info.publishedAt.split('T')[0]}
                      </PublishedAt>
                    )}
                    <View>{Info.viewCount} view</View>
                  </div>
                  <Title>{Info.title.length > 41 ? `${Info.title.slice(0,41)}...` : Info.title}</Title>
                </Sub>
              </Wrapper>
            ))}
        </VideoBlock>
      )}
    </>
  );
};

export default React.memo(Videos);
