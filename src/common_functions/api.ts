import {useLogStore} from '@/stores/LogStore'
import Helpers from '@/common_functions/helpers'

export default class Api {
    baseURL: string
    ws: WebSocket
    token: string
    userName: string
    password: string
    logStore: any // Store Если будет время поискать, как задать тип для store
    pingCounter: number
    subscribeCounter: number
    helpers: Helpers

    constructor(baseUrl: string, userName: string, password: string) {
        this.baseURL = baseUrl;
        this.userName = userName
        this.password = password
        this.token = ''
        this.logStore = useLogStore()
        this.pingCounter = 0
        this.subscribeCounter = 0
        this.helpers = new Helpers

        this.ws = new WebSocket(this.baseURL);

        this.connectToServer()
        this.handleMessages()  
        
        this.ws.onclose = () => (
            this.connectToServer()
        )
    }

    connectToServer = () => {
        this.ws.onopen = () => {
            this.ws.send(JSON.stringify([2, this.helpers.generateRandomString(16), 'http://enter.local/login', this.userName, this.password]))
            
            let pingInterval = setInterval(() => {
                if (this.ws.readyState === WebSocket.OPEN) {
                    this.ws.send(JSON.stringify([20, this.pingCounter++]));
                } else {
                    clearInterval(pingInterval)
                }
            }, 30000);
        };
    }      

    handleMessages = () => {
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            switch (data[0]) {
                case 0:
                    break
                case 3:
                    this.token = data[2].Token
                    this.ws.send(JSON.stringify([5, 'http://enter.local/subscription/logs/list']))
                    break
                case 4:
                    console.error(data)
                case 8:               
                    if (!data[2].SubscribeError) {
                        this.logStore.addLogs(data[2].Items.map((log: Log) => {
                            log.id = this.helpers.generateRandomString(10)
                            return log
                        }
                            ))
                    } else {
                        console.error(data[2].SubscribeError)
                        if (this.subscribeCounter < 3) {
                            setTimeout(() => {
                                this.ws.send(JSON.stringify([5, 'http://enter.local/subscription/logs/list']))    

                            }, 5000)
                        }
                    }
                    break
                case 20:
                    break
                default: 
                    console.log(data);     
            }          
        }
    }

    disconnectFromServer = () => {
        this.ws.close()
    }
}