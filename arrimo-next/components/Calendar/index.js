import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import interactionPlugin from "@fullcalendar/interaction" // don't remove !

import dayGridPlugin from '@fullcalendar/daygrid';


import ModalComponent from '../CalendarModal';
import { Row, Col } from 'antd';

import { httpGetEvents } from '../../requests/events';

const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });


const CalendarComponent = () => {
    const [state, setState] = useState({
        showModal: false,
        operationType: "Add",
        modalTitle: "Add New Event",
        selectedDate: null,
        eventData: null
    })




    const [allEvents, setAllEvents] = useState([]);
    const { operationType, modalTitle, selectedDate, showModal, eventData } = state;


    const handleEventClick = (eventData) => {
        console.log(eventData);
        setState({
            ...state,
            eventData: {
                event_id: eventData?.event._def?.extendedProps.event_id,
                title: eventData?.event._def.title,
                date: eventData?.el?.fcSeg.eventRange.range.start,
            },
            showModal: true,
            operationType: 'Edit',
            modalTitle: "Edit Event",

        })
    }

    const getEvents = () => {
        httpGetEvents().then(res => {
            console.log(res.data);
            setAllEvents(res.data.map(item => (
                {
                    title: item.event,
                    date: item.date,
                    event_id: item._id
                }
            )))
        })
    }

    const handleDateClick = (arg) => {
        setState({
            ...state,
            showModal: true,
            selectedDate: arg,
            eventData: null
        })
    }

    const onClose = () => {
        setState({
            ...state,
            showModal: false,
            selectedDate: null,
            operationType: "Add",
            modalTitle: "New Event",
        })
        getEvents();
    }

    useEffect(() => {
        getEvents();
    }, [])


    return (
        <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col span={9}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={allEvents}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                />
            </Col>

            {showModal ? <ModalComponent show={showModal} handleCancel={onClose} title={modalTitle} operationType={operationType} selectedDate={selectedDate} eventData={eventData} /> : null}
        </Row>
    )
}

export default CalendarComponent;