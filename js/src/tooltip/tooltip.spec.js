import Tooltip from './tooltip'
import { makeArray } from '../util/index'

/** Test helpers */
import { getFixture, clearFixture } from '../../tests/helpers/fixture'

describe('Tooltip', () => {
  let fixtureEl

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()

    const tooltipList = makeArray(document.querySelectorAll('.tooltip'))

    tooltipList.forEach(tooltipEl => {
      document.body.removeChild(tooltipEl)
    })
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(Tooltip.VERSION).toEqual(jasmine.any(String))
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(Tooltip.Default).toEqual(jasmine.any(Object))
    })
  })

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Tooltip.NAME).toEqual(jasmine.any(String))
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Tooltip.DATA_KEY).toEqual('bs.tooltip')
    })
  })

  describe('Event', () => {
    it('should return plugin events', () => {
      expect(Tooltip.Event).toEqual(jasmine.any(Object))
    })
  })

  describe('EVENT_KEY', () => {
    it('should return plugin event key', () => {
      expect(Tooltip.EVENT_KEY).toEqual('.bs.tooltip')
    })
  })

  describe('DefaultType', () => {
    it('should return plugin default type', () => {
      expect(Tooltip.DefaultType).toEqual(jasmine.any(Object))
    })
  })

  describe('enable', () => {
    it('should enable a tooltip', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltip.enable()

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeDefined()
        done()
      })

      tooltip.show()
    })
  })

  describe('disable', () => {
    it('should disable tooltip', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltip.disable()

      tooltipEl.addEventListener('show.bs.tooltip', () => {
        throw new Error('should not show a disabled tooltip')
      })

      tooltip.show()

      setTimeout(() => {
        expect().nothing()
        done()
      }, 10)
    })
  })

  describe('toggleEnabled', () => {
    it('should toggle enabled', () => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      expect(tooltip._isEnabled).toEqual(true)

      tooltip.toggleEnabled()

      expect(tooltip._isEnabled).toEqual(false)
    })
  })

  describe('toggle', () => {
    it('should do nothing if disabled', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltip.disable()

      tooltipEl.addEventListener('show.bs.tooltip', () => {
        throw new Error('should not show a disabled tooltip')
      })

      tooltip.toggle()

      setTimeout(() => {
        expect().nothing()
        done()
      }, 10)
    })

    it('should show a tooltip', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeDefined()
        done()
      })

      tooltip.toggle()
    })

    it('should call toggle and show the tooltip when trigger is "click"', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        trigger: 'click'
      })

      spyOn(tooltip, 'toggle').and.callThrough()

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(tooltip.toggle).toHaveBeenCalled()
        done()
      })

      tooltipEl.click()
    })

    it('should hide a tooltip', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        tooltip.toggle()
      })

      tooltipEl.addEventListener('hidden.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeNull()
        done()
      })

      tooltip.toggle()
    })

    it('should call toggle and hide the tooltip when trigger is "click"', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        trigger: 'click'
      })

      spyOn(tooltip, 'toggle').and.callThrough()

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        tooltipEl.click()
      })

      tooltipEl.addEventListener('hidden.bs.tooltip', () => {
        expect(tooltip.toggle).toHaveBeenCalled()
        done()
      })

      tooltipEl.click()
    })
  })

  describe('dispose', () => {
    it('should destroy a tooltip', () => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      expect(Tooltip._getInstance(tooltipEl)).toEqual(tooltip)

      tooltip.dispose()

      expect(Tooltip._getInstance(tooltipEl)).toEqual(null)
    })

    it('should destroy a tooltip and remove it from the dom', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeDefined()

        tooltip.dispose()

        expect(document.querySelector('.tooltip')).toBeNull()
        done()
      })

      tooltip.show()
    })
  })

  describe('show', () => {
    it('should show a tooltip', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        const tooltipShown = document.querySelector('.tooltip')

        expect(tooltipShown).toBeDefined()
        expect(tooltipEl.getAttribute('aria-describedby')).toEqual(tooltipShown.getAttribute('id'))
        done()
      })

      tooltip.show()
    })

    it('should show a tooltip with a dom element container', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        container: fixtureEl
      })

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(fixtureEl.querySelector('.tooltip')).toBeDefined()
        done()
      })

      tooltip.show()
    })

    it('should show a tooltip with a jquery element container', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        container: {
          0: fixtureEl,
          jquery: 'jQuery'
        }
      })

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(fixtureEl.querySelector('.tooltip')).toBeDefined()
        done()
      })

      tooltip.show()
    })

    it('should show a tooltip with a selector in container', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        container: '#fixture'
      })

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(fixtureEl.querySelector('.tooltip')).toBeDefined()
        done()
      })

      tooltip.show()
    })

    it('should show a tooltip with placement as a function', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const spy = jasmine.createSpy('placement').and.returnValue('top')
      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        placement: spy
      })

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeDefined()
        expect(spy).toHaveBeenCalled()
        done()
      })

      tooltip.show()
    })

    it('should show a tooltip with offset as a function', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const spy = jasmine.createSpy('offset').and.returnValue({})
      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        offset: spy
      })

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeDefined()
        expect(spy).toHaveBeenCalled()
        done()
      })

      tooltip.show()
    })

    it('should show a tooltip without the animation', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        animation: false
      })

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        const tip = document.querySelector('.tooltip')

        expect(tip).toBeDefined()
        expect(tip.classList.contains('fade')).toEqual(false)
        done()
      })

      tooltip.show()
    })

    it('should throw an error the element is not visible', () => {
      fixtureEl.innerHTML = '<a href="#" style="display: none" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      try {
        tooltip.show()
      } catch (error) {
        expect(error.message).toEqual('Please use show on visible elements')
      }
    })

    it('should not show a tooltip if show.bs.tooltip is prevented', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      const expectedDone = () => {
        setTimeout(() => {
          expect(document.querySelector('.tooltip')).toBeNull()
          done()
        }, 10)
      }

      tooltipEl.addEventListener('show.bs.tooltip', ev => {
        ev.preventDefault()
        expectedDone()
      })

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        throw new Error('Tooltip should not be shown')
      })

      tooltip.show()
    })
  })

  describe('hide', () => {
    it('should hide a tooltip', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltipEl.addEventListener('shown.bs.tooltip', () => tooltip.hide())
      tooltipEl.addEventListener('hidden.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeNull()
        expect(tooltipEl.getAttribute('aria-describedby')).toBeNull()
        done()
      })

      tooltip.show()
    })

    it('should hide a tooltip without animation', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        animation: false
      })

      tooltipEl.addEventListener('shown.bs.tooltip', () => tooltip.hide())
      tooltipEl.addEventListener('hidden.bs.tooltip', () => {
        expect(document.querySelector('.tooltip')).toBeNull()
        expect(tooltipEl.getAttribute('aria-describedby')).toBeNull()
        done()
      })

      tooltip.show()
    })

    it('should not hide a tooltip if hide event is prevented', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const assertDone = () => {
        setTimeout(() => {
          expect(document.querySelector('.tooltip')).not.toBeNull()
          done()
        }, 20)
      }

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl, {
        animation: false
      })

      tooltipEl.addEventListener('shown.bs.tooltip', () => tooltip.hide())
      tooltipEl.addEventListener('hide.bs.tooltip', event => {
        event.preventDefault()
        assertDone()
      })
      tooltipEl.addEventListener('hidden.bs.tooltip', () => {
        throw new Error('should not trigger hidden event')
      })

      tooltip.show()
    })
  })

  describe('update', () => {
    it('should call popper schedule update', done => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltipEl.addEventListener('shown.bs.tooltip', () => {
        spyOn(tooltip._popper, 'scheduleUpdate')

        tooltip.update()

        expect(tooltip._popper.scheduleUpdate).toHaveBeenCalled()
        done()
      })

      tooltip.show()
    })

    it('should do nothing if the tooltip is not shown', () => {
      fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"/>'

      const tooltipEl = fixtureEl.querySelector('a')
      const tooltip = new Tooltip(tooltipEl)

      tooltip.update()
      expect().nothing()
    })
  })
})
