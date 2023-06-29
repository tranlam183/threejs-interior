const ClientStorage = class {
  set(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
     
    }
  }

  get(key: string) {
    try {
      let dataValue = JSON.parse(localStorage.getItem(key) ?? '')
      return dataValue
    } catch (e) {
     
    }
  }

  remove(key: string) {
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}

const clientStorage = new ClientStorage()

const SessionStorage = {
  set(key: string, value: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
    
    }
  },
  get(key: string) {
    try {
      let dataValue = sessionStorage.getItem(key)
        ? JSON.parse(sessionStorage.getItem(key) ?? '')
        : ''
      return dataValue
    } catch (e) {
   
    }
  },
  remove(key: string) {
    sessionStorage.removeItem(key)
  },
  clear() {
    sessionStorage.clear()
  },
}

export { clientStorage, SessionStorage as sessionStorage }
