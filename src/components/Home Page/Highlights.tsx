import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import highlightCardData from '../../data/HighlightCardData';
import Carousel from '../Global/Carousel';

export interface HighlightCardProps
{
    title: string;
    subTitle: string;
    timeFrame: string;
    imageSrc: string;
    description: string;
    longDescription: string;
    resources: { href: string, text?: string }[];
}

const HighlightModal = (props: HighlightCardProps) =>
{
    return (
        <>
            <div className='w-100 card-image d-flex align-items-end' style={{
                backgroundColor: '#00000090',
                backgroundImage: `url(${props.imageSrc})`,
                backgroundBlendMode: 'overlay',
                height: '15rem'
            }}>
                <code
                    className='text-white display-6 fw-bold ps-2'
                    style={{
                        lineHeight: '3rem',
                        textShadow: '-2px 0 5px black'
                    }}
                >
                    {props.title}
                </code>
            </div>
            <div className='mx-3 mt-2 mb-3'>
                <div>
                    <code className='text-white fs-5 text-muted fst-italic'>{props.subTitle}</code><br/>
                    <code className='text-white fs-6 text-muted fst-italic'>{props.timeFrame}</code>
                </div>
                <div className='fs-5 mt-3'>
                    <p className='d-none d-md-block'>&emsp;{props.longDescription}</p>
                    <p className='d-block d-md-none'>&emsp;{props.description}</p>
                </div>
                {
                    props.resources.length > 0 ?
                    (
                        <>
                            <code className='text-white fs-5'>Additional Resources:</code>
                            {
                                props.resources.map((data, index) => {
                                    return (
                                        <li key={`Resource-${props.title}-${index}`}>
                                            <a href={data.href}>
                                                {data.text ? data.text : data.href}
                                            </a>
                                        </li>
                                    );
                                })
                            }
                        </>
                    )
                    :
                    undefined
                }
            </div>
        </>
    );
}

const Highlights = () =>
{
    const [isOpen, setOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<JSX.Element>(<>Error</>);

    const HandleCardClick = (newContent: JSX.Element) =>
    {
        setModalContent(newContent);
        setOpen(true);
    }

    const HighlightCard = (props: HighlightCardProps) =>
    {
        return (
            <div
                className='m-3 item-card overflow-hidden d-flex flex-column position-relative'
                onClick={() => HandleCardClick(
                    <HighlightModal {...props} />
                )}
            >
                <div className='w-100 card-image' style={{
                    backgroundImage:`url(${props.imageSrc})`
                }} />
                <div className='p-3 w-100'>
                    <code className="fs-5 text-white mt-1 mb-0">{props.title}</code><br/>
                    <small className='fst-italic text-muted'>{props.subTitle}</small><br/>
                    <small className='text-white'>
                        {props.description}
                    </small>
                </div>
            </div>
        );
    }

    return (
        <>
            <h1 className="w-100 text-center mt-4">Career Highlights</h1>
            <Carousel items={
                highlightCardData.map((data: HighlightCardProps, index: number) => {
                    return (
                        <HighlightCard
                            {...data}
                        />
                    );
                })
            } />

            <Modal
                size='xl'
                centered
                show={isOpen}
                className='modal-tint'
                onHide={() => setOpen(false)}
            >
                <div className='card-modal'>
                    <CloseButton
                        onClick={() => setOpen(false)}
                        className='position-absolute top-0 end-0 m-2 bg-white border border-dark'
                    />  
                    {modalContent}
                </div>
            </Modal>
        </>
    );
}

export default Highlights;