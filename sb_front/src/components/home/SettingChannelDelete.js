import React from 'react';
import styled,{css} from 'styled-components';
import Button from '../common/Button.js';
import palette from '../common/palette.js';

import { MdCancel } from 'react-icons/md';

const common = css`
  display: flex;
  border-radius: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${palette.toneDownWhite};
  width: 310px;
  height: 330px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
`;

const comAnimation = set =>set ? css`
  animation: setAnimation 0.3s linear forwards;

@keyframes setAnimation {
  0% {
    opacity: 25%;
  }
  100% {
    opacity: 100%;
  }
}
`: css`
animation: okAnimation 0.3s linear forwards;
    @keyframes okAnimation {
    0% {
      opacity: 25%;
      transform:translateY(-20px);
    }
    100% {
      transform:translateY(0);
      opacity: 100%;
    }
  }
`;

const Form = styled.form`
  ${common}

  button:hover {
    background: ${palette.yellow};
  }
  select {
    border: none;
    width: 100px;
    height: 30px;
    border-radius: 4px;
    margin: 1rem 0;
    outline: none;
  }
  input {
    outline: none;
    border: none;
    width: 220px;
    height: 30px;
    border-radius: 4px;
  }
  .title {
    color: ${palette.black};
    margin-bottom: 1rem;
  }
`;

const OnBlock = styled.div`
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 100%;
  width: 756px;
  border-radius: 1rem;
  height: 550px;
  background: rgba(0, 0, 0, 0.25);

  .cancelIcon {
    display: flex;
    width: 310px;
    justify-content: flex-end;
    margin-bottom: 4px;
  }

  ${comAnimation('set')}
`;

const Error = styled.div`
  color: ${palette.red};
  margin-bottom: 4px;
`;


const SettingChannelDelete = ({ onCancel,error, removeName, onChangeRemoveName,onSubmitRemoveName}) => {
    return (
        <OnBlock>
          <div>
          <div className="cancelIcon">
            <MdCancel onClick={onCancel} />
          </div>
          <Form onSubmit={onSubmitRemoveName}>
            <div className="title">크리에티어 제거</div>
            <input
              type="text"
              name="name"
              value={removeName}
              onChange={onChangeRemoveName}
              placeholder="채널 이름"
            />
            {error && <Error>{error}</Error>}
            <Button>입력</Button>
          </Form>
          </div>
        </OnBlock>
    )
}

export default React.memo(SettingChannelDelete)