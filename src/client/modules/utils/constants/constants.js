const EVENT_MINDSTORM_PICKUP_REQUESTED = 'Mindstorm_Pickup_Requested';
const EVENT_MINDSTORM_PAYLOAD_IDENTIFIED = 'Mindstorm_Payload_Identified';
const EVENT_MINDSTORM_PAYLOAD_DELIVERED = 'Mindstorm_Payload_Delivered';
const EVENT_MINDSTORM_PAYLOAD_MISSING = 'Mindstorm_Payload_Missing';

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
        label: 'Mindstorm Pickup Requested',
        name: EVENT_MINDSTORM_PICKUP_REQUESTED
    },
    {
        label: 'Mindstorm Payload Identified',
        name: EVENT_MINDSTORM_PAYLOAD_IDENTIFIED
    },
    {
        label: 'Mindstorm Pickup Completed',
        name: EVENT_MINDSTORM_PAYLOAD_DELIVERED
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
    EVENT_MINDSTORM_PICKUP_REQUESTED,
    EVENT_MINDSTORM_PAYLOAD_IDENTIFIED,
    EVENT_MINDSTORM_PAYLOAD_DELIVERED,
    EVENT_MINDSTORM_PAYLOAD_MISSING,
    EVENT_ARM_PICKUP_REQUESTED,
    EVENT_ARM_PICKUP_REJECTED,
    EVENT_ARM_PICKUP_CONFIRMED,
    EVENT_ARM_PICKUP_COMPLETED,
    EVENT_TRAIN_PAYLOAD_RECEIVED,
    EVENT_TRAIN_PAYLOAD_ARRIVED,
    EVENT_TRAIN_PAYLOAD_DELIVERED,
    EVENT_TRAIN_RESET
};
