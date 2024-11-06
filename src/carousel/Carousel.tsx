import React from 'react';
import styled, { useTheme } from "styled-components";
import { useCarousel } from './useCarousel';

export interface CarouselProps {
    imageList: string[];
    width: string;
    height: string;
    autoPlay?: boolean;
    transitionDuration?: number;
    themeObject?: { [key: string]: string };
}

const CarouselContainer = styled.div<{width: string, height: string}>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImageWrapper = styled.div<{ currentIndex: number, transitionDuration?: number }>`
    display: flex;
    transition: ${props => `transform ${props.transitionDuration}ms ease`};
    transform: ${(props) => `translateX(-${props.currentIndex * 100}%)`};
`;

// CarouselImage: Styles for each image in the carousel
const CarouselImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    flex-shrink: 0;
`;

const NavButton = styled.button<{ direction: 'left' | 'right' }>`
    position: absolute;
    top: 50%;
    ${(props) => (props.direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 24px;
    z-index: 1;
    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }
`;

const DotsContainer = styled.div`
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const Dot = styled.button<{isActive: boolean}>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.isActive ? "#000" : "#bbb"};
    cursor: pointer;
    border: none;
    &:hover {
        background-color: #333;
    }
`;

const Carousel: React.FC<CarouselProps> = ({
    imageList,
    width,
    height,
    autoPlay = false,
    transitionDuration = 500
}) => {
    const {
        currentIndex,
        nextImage,
        prevImage,
        showImage
    } = useCarousel(imageList, autoPlay, transitionDuration);

	return <CarouselContainer width={width} height={height}>
        <ImageWrapper currentIndex={currentIndex} transitionDuration={transitionDuration}>
            {
                imageList?.map((image, index) => (
                    <CarouselImage 
                        src={image}
                        alt={`carousel-img-${index+1}`}
                        key={index}
                        loading="lazy"
                    />
                ))
            }
        </ImageWrapper>

        <NavButton direction="left" onClick={prevImage}>
            &#10094;
        </NavButton>
        <NavButton direction="right" onClick={nextImage}>
            &#10095;
        </NavButton>

        <DotsContainer>
            {
                imageList?.map((_, index) => (
                    <Dot
                        key={index}
                        isActive={index === currentIndex}
                        onClick={() => showImage(index)}
                    />
                ))
            }
        </DotsContainer>
    </CarouselContainer>;
};

export default Carousel;