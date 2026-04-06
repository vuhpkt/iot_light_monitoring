import mqtt from 'mqtt'

class MqttService {
    connect() {
        mqtt.connectAsync('mqtts://' + process.env.MQTT_BROKER_URL, {
            username: process.env.MQTT_USERNAME,
            password: '3D_iGL3xp43cb#w'
        })
            .then(client => {
                client.on('error', err => {
                    console.error('MQTT error: ', err)
                })
            })
    }
}

export default new MqttService()
