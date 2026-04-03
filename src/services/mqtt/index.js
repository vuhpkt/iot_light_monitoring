import mqtt from 'mqtt'

class MqttService {
    constructor() {
        this.client = null
    }

    connect() {
        this.client = mqtt.connect('mqtts://' + process.env.MQTT_BROKER_URL, {
            username: process.env.MQTT_USERNAME,
            password: '3D_iGL3xp43cb#w'
        })
        this.client.on("connect", () => {
            console.log('MQTT connected')
            this.client.subscribe("presence", (err) => {
                if (!err) {
                    this.client.publish("presence", "Hello mqtt");
                }
            })
        })

        this.client.on('error', (err) => {
            console.error('MQTT Error:', err);
        });
    }
}

export default new MqttService()
