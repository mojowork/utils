export function createDataHub () {
    return {
        hub: {},
        set(symbol, data) {
            if(!this.hub[symbol]){
                this.hub[symbol] = []
            }
            this.hub[symbol].push(data)
            return this.hub[symbol].length - 1
        },
        get(symbol, id) {
            if(!this.hub[symbol]) return
            if(id == null){
                return this.hub[symbol].filters(Boolean)
            } else {
                return this.hub[symbol][id]
            }
            
        },
        eject(symbol, id) {
            if(!this.hub[symbol]) return
            if(id == null){
                delete this.hub[symbol]
            } else {
                this.hub[symbol][id] = null
            }
        },
        clean() {
            this.hub = {}
        }

    }
}