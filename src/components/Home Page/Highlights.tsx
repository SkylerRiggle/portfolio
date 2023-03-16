import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import highlightCardData from '../../data/HighlightCardData';

export interface HighlightCardProps
{
    title: string;
    subTitle?: string;
    imageSrc: string;
    description?: string;
}

const HighlightModal = (props: HighlightCardProps) =>
{
    return (
        <>{props.title}</>
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
            <div
                className="bg-accent mx-2 rounded mb-5 d-flex flex-wrap justify-content-center mx-5 overflow-hidden"
                style={{
                    boxShadow: 'inset 0 0 5px black'
                }}
            >
                {
                    highlightCardData.map((data: HighlightCardProps, index: number) => {
                        return (
                            <HighlightCard
                                {...data}
                            />
                        );
                    })
                }
            </div>

            <Modal
                size='xl'
                centered
                show={isOpen}
            >
                <CloseButton onClick={() => setOpen(false)} />
                {modalContent}
            </Modal>
        </>
    );
}

export default Highlights;