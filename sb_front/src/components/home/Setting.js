import React from 'react';
import styled from 'styled-components';

import FlashMessage from 'react-flash-message';
import palette from '../common/palette.js';
import SettingChannelAdd from './settingChildren/SettingChannelAdd.js';
import { BiPlusMedical } from 'react-icons/bi';
import {ImMinus} from 'react-icons/im';
import SettingChannelDelete from './settingChildren/SettingChannelDelete.js';

const SettingBlock = styled.div`
  svg:hover{
    color: ${palette.yellow};
 }
`;

const OkBlock = styled.div`
  position: absolute;
    background: ${palette.yellow};
    height: 20px;
    text-align: center;
    border-radius: 1rem;
    width: 756px;
    left:0;

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
`

const Setting = ({
  channelId,
  name,
  categoryId,
  onChange,
  onSubmit,
  onClick,
  onCancel,
  onClickQue,
  offClickQue,
  error,
  useOnButton,
  useAlert,
  useQue,
  onRemove,
  useOnRemove,
  removeName,
  onChangeRemoveName,
  useRemoveList,
  onDeleteClick
}) => {
  return (
    <>
    <SettingBlock>
      { useOnButton ? (
        <>
       <SettingChannelAdd channelId={channelId} name={name} categoryId={categoryId} onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onClickQue={onClickQue} offClickQue={offClickQue} error={error} useQue={useQue} />
       <BiPlusMedical onClick={onClick} style={{color:`${palette.yellow}`}}/>
       <ImMinus onClick={onRemove}/>
       </>
       ) : useOnRemove ? (<><SettingChannelDelete onCancel={onCancel} onChangeRemoveName={onChangeRemoveName} removeName={removeName} useRemoveList={useRemoveList} onDeleteClick={onDeleteClick}/>
        <BiPlusMedical onClick={onClick}/>
       <ImMinus onClick={onRemove} style={{color:`${palette.yellow}`}}/>
       </>) : 
       (<><BiPlusMedical onClick={onClick}/>
       <ImMinus onClick={onRemove}/></>)}
    </SettingBlock>
    {useAlert && (
    <FlashMessage duration={3500} persistOnHover={true}><OkBlock>
  성공!! 새로고침 후 적용됩니다.</OkBlock></FlashMessage>
)}
    </>
  );
};

export default React.memo(Setting);
