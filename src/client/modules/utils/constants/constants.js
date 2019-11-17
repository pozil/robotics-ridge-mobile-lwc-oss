const EVENT_ULTIMATE_PICKUP_REQUESTED = 'Ultimate_Pickup_Requested';
const EVENT_ULTIMATE_PAYLOAD_IDENTIFIED = 'Ultimate_Payload_Identified';
const EVENT_ULTIMATE_PAYLOAD_DELIVERED = 'Ultimate_Payload_Delivered';
const EVENT_ULTIMATE_PAYLOAD_MISSING = 'Ultimate_Payload_Missing';

const EVENT_ARM_PICKUP_REQUESTED = 'ARM_Pickup_Requested';
const EVENT_ARM_PICKUP_CONFIRMED = 'ARM_Pickup_Confirmed';
const EVENT_ARM_PICKUP_REJECTED = 'ARM_Pickup_Rejected';
const EVENT_ARM_PICKUP_COMPLETED = 'ARM_Pickup_Completed';

const EVENT_TRAIN_PAYLOAD_RECEIVED = 'Train_Payload_Received';
const EVENT_TRAIN_PAYLOAD_ARRIVED = 'Train_Payload_Arrived';
const EVENT_TRAIN_PAYLOAD_DELIVERED = 'Train_Payload_Delivered';
const EVENT_TRAIN_RESET = 'Train_Reset';

const STEPS = [
    {
        label: 'Ultimate Pickup Requested',
        name: EVENT_ULTIMATE_PICKUP_REQUESTED
    },
    {
        label: 'Ultimate Payload Identified',
        name: EVENT_ULTIMATE_PAYLOAD_IDENTIFIED
    },
    {
        label: 'Ultimate Pickup Completed',
        name: EVENT_ULTIMATE_PAYLOAD_DELIVERED
    },
    { label: 'Arm Pickup Requested', name: EVENT_ARM_PICKUP_REQUESTED },
    { label: 'Arm Pickup Confirmed', name: EVENT_ARM_PICKUP_CONFIRMED },
    { label: 'Arm Pickup Completed', name: EVENT_ARM_PICKUP_COMPLETED },
    { label: 'Train Payload Received', name: EVENT_TRAIN_PAYLOAD_RECEIVED },
    { label: 'Train Arrived', name: EVENT_TRAIN_PAYLOAD_ARRIVED },
    { label: 'Train Payload Delivered', name: EVENT_TRAIN_PAYLOAD_DELIVERED }
];

export {
    STEPS,
    EVENT_ULTIMATE_PICKUP_REQUESTED,
    EVENT_ULTIMATE_PAYLOAD_IDENTIFIED,
    EVENT_ULTIMATE_PAYLOAD_DELIVERED,
    EVENT_ULTIMATE_PAYLOAD_MISSING,
    EVENT_ARM_PICKUP_REQUESTED,
    EVENT_ARM_PICKUP_REJECTED,
    EVENT_ARM_PICKUP_CONFIRMED,
    EVENT_ARM_PICKUP_COMPLETED,
    EVENT_TRAIN_PAYLOAD_RECEIVED,
    EVENT_TRAIN_PAYLOAD_ARRIVED,
    EVENT_TRAIN_PAYLOAD_DELIVERED,
    EVENT_TRAIN_RESET
};
