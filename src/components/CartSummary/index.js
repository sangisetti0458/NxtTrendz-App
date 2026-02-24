import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const totalAmount = cartList.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        )

        const onConfirmOrder = () => {
          setIsOrderPlaced(true)
        }

        return (
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              Order Total:
              <span className="order-total-price"> Rs {totalAmount}/-</span>
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>

            <Popup
              modal
              trigger={
                <button type="button" className="checkout-button">
                  Checkout
                </button>
              }
            >
              {close => (
                <div className="payment-popup-container">
                  {isOrderPlaced ? (
                    <p>Your order has been placed successfully</p>
                  ) : (
                    <>
                      <h1>Payment</h1>

                      <div>
                        <label>
                          <input type="radio" disabled />
                          Card
                        </label>
                      </div>

                      <div>
                        <label>
                          <input type="radio" disabled />
                          Net Banking
                        </label>
                      </div>

                      <div>
                        <label>
                          <input type="radio" disabled />
                          UPI
                        </label>
                      </div>

                      <div>
                        <label>
                          <input type="radio" disabled />
                          Wallet
                        </label>
                      </div>

                      <div>
                        <label>
                          <input
                            type="radio"
                            name="payment"
                            value="COD"
                            onChange={e =>
                              setPaymentMethod(e.target.value)
                            }
                          />
                          Cash on Delivery
                        </label>
                      </div>

                      <button
                        type="button"
                        disabled={paymentMethod !== 'COD'}
                        onClick={onConfirmOrder}
                      >
                        Confirm Order
                      </button>
                    </>
                  )}
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary