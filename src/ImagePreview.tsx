import { useState, useRef } from 'react';
import styled from '@emotion/styled'

const Container = styled.div `
  display: flex;
  flex-direction: column;
`

const ImageSection = styled.div`
  background-color: #333;
  display: flex;
  justify-content: center;
`

const TopBar = styled.div `
  background-color: #333;
  height: 50px;
  display: flex;
  justify-content: flex-end;
`

const BottomBar = styled.div`
  background-color: #333;
  height: 50px;
  display: flex;
  justify-content: center;
  column-gap: 20px;
`

const ControlButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  &:hover {
    cursor: pointer;
  }
`

type Props = {
  imageSrc: string;
  onClose: () => void
}

function ImagePreview({ imageSrc, onClose }: Props) {
  const ZOOM_RATIO = 1.1;
  const [scale, setScale ] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);

  const zoomOut = () => {
    setScale(scale / ZOOM_RATIO);
  }

  const zoomIn = () => {
    setScale(scale * ZOOM_RATIO);
  }

  const resetScale = () => {
    setScale(1);
  }

  const originalHeight = imageRef.current?.naturalHeight ?? 0;
  const originalWidth = imageRef.current?.naturalWidth ?? 0;

  const scaledDimensions = {
    width: scale * originalWidth,
    height: scale * originalHeight
  }

  return (
    <Container>
      <TopBar>
        <ControlButton onClick={onClose}>X</ControlButton>
      </TopBar>
      <ImageSection>
        <img src={imageSrc} alt="user laoded image" ref={imageRef} style={scaledDimensions}/>
      </ImageSection>
      <BottomBar>
        <ControlButton onClick={zoomOut}>-</ControlButton>
        <ControlButton onClick={resetScale}>{Math.round(scale * 100)}</ControlButton>
        <ControlButton onClick={zoomIn}>+</ControlButton>
      </BottomBar>
    </Container>
  );
}

export default ImagePreview;