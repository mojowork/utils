export function createEventBus() {
    return {
        hub: {},
        emit (symbol, data) {
            if(!this.hub[symbol]) return
            this.hub[symbol].forEach(handler => handler(data));
        },
        on (symbol, handler) {
            if(!this.hub[symbol]){
                this.hub[symbol] = []
            }
            this.hub[symbol].push(handler)
        },
        off (symbol, cancelHandler) {
            if(!this.hub[symbol]) return
            if(!cancelHandler){
                delete this.hub[symbol]
            } else {
                let index = this.hub[symbol].findIndex(handler => cancelHandler === handler)
                if(index > -1) this.hub[symbol].splice(index, 1)
            }
        }

    }
}