import { useState } from "react";
export default function App() {
  const [pizzas, setPizzas] = useState([
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Add pizza
  function addPizza(pizza) {
    setPizzas((prev) => [...prev, pizza]);
  }
  // Delete pizza
  function deletePizza(name) {
    setPizzas((prev) => prev.filter((p) => p.name !== name));
  }
  // Toggle sold out
  function toggleSoldOut(name) {
    setPizzas((prev) =>
      prev.map((p) => (p.name === name ? { ...p, soldOut: !p.soldOut } : p))
    );
  }

  function handleLogin(username, password) {
    if (username === "MajedAlshareef" && password === "1234") {
      setIsAuthenticated(true);
      setShowDashboard(true);
      setShowLoginForm(false);
    } else {
      alert("Invalid credentials! Use MajedAlshareef / 1234");
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setShowDashboard(false);
  }

  function toggleLoginForm() {
    setShowLoginForm(!showLoginForm);
  }

  return (
    <div className="container">
      <Header />
      <ToggleButton toggleLoginForm={toggleLoginForm} />
      {showLoginForm && !isAuthenticated && (
        <LoginForm
          onLogin={handleLogin}
          onClose={() => setShowLoginForm(false)}
        />
      )}
      {isAuthenticated && showDashboard && (
        <Dashboard
          pizzas={pizzas}
          addPizza={addPizza}
          deletePizza={deletePizza}
          toggleSoldOut={toggleSoldOut}
          onLogout={handleLogout}
        />
      )}
      {isAuthenticated && !showDashboard && (
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <button className="btn" onClick={() => setShowDashboard(true)}>
            Open Dashboard
          </button>
          <button
            className="btn"
            onClick={handleLogout}
            style={{ marginLeft: "1rem", background: "#f66" }}
          >
            Logout
          </button>
        </div>
      )}
      <Menu pizzas={pizzas} />
      <Footer />
    </div>
  );
}
function ToggleButton({ toggleLoginForm }) {
  return (
    <button
      onClick={toggleLoginForm}
      style={{
        position: "fixed",
        top: "2rem",
        right: "2rem",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "2rem",
        color: "#edc84b",
        padding: "0.5rem",
        borderRadius: "50%",
        width: "4rem",
        height: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        backgroundColor: "rgba(237, 200, 75, 0.1)",
        zIndex: 999,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "rgba(237, 200, 75, 0.2)";
        e.target.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "rgba(237, 200, 75, 0.1)";
        e.target.style.transform = "scale(1)";
      }}
    >
      ⋯
    </button>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Company</h1>
    </header>
  );
}

function LoginForm({ onLogin, onClose }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(credentials.username, credentials.password);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 400,
          margin: "2rem",
          background: "#fffbe6",
          borderRadius: 8,
          padding: 24,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          animation: "slideIn 0.3s ease",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#666",
            padding: "0.5rem",
            borderRadius: "50%",
            width: "3rem",
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(0,0,0,0.1)";
            e.target.style.color = "#333";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#666";
          }}
        >
          ×
        </button>
        <h2 style={{ marginBottom: 16, textAlign: "center" }}>Admin Login</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <input
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username"
            required
            style={{
              padding: "12px 16px",
              borderRadius: 6,
              border: "2px solid #ddd",
              fontSize: "1.4rem",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#edc84b")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={{
              padding: "12px 16px",
              borderRadius: 6,
              border: "2px solid #ddd",
              fontSize: "1.4rem",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#edc84b")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
          <button
            type="submit"
            className="btn"
            style={{
              padding: "12px 16px",
              fontSize: "1.4rem",
              transition: "all 0.3s ease",
            }}
          >
            Login
          </button>
        </form>
        <p
          style={{
            fontSize: 12,
            color: "#666",
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Use: MajedAlshareef / 1234
        </p>
      </section>
    </div>
  );
}

function Dashboard({ pizzas, addPizza, deletePizza, toggleSoldOut, onLogout }) {
  const [form, setForm] = useState({
    name: "",
    ingredients: "",
    price: "",
    photoName: "",
    soldOut: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.ingredients || !form.price || !form.photoName)
      return;
    addPizza({
      ...form,
      price: Number(form.price),
    });
    setForm({
      name: "",
      ingredients: "",
      price: "",
      photoName: "",
      soldOut: false,
    });
  }

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 800,
        margin: "2rem auto",
        background: "#fffbe6",
        borderRadius: 8,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2>Admin Dashboard</h2>
        <button
          className="btn"
          onClick={onLogout}
          style={{ background: "#f66", color: "#fff" }}
        >
          Logout
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          style={{ flex: 1, minWidth: 100 }}
        />
        <input
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
          placeholder="Ingredients"
          style={{ flex: 2, minWidth: 120 }}
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          min="1"
          style={{ width: 70 }}
        />
        <input
          name="photoName"
          value={form.photoName}
          onChange={handleChange}
          placeholder="Image path (e.g. pizzas/focaccia.jpg)"
          style={{ flex: 2, minWidth: 120 }}
        />
        <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <input
            name="soldOut"
            type="checkbox"
            checked={form.soldOut}
            onChange={handleChange}
          />{" "}
          Sold Out
        </label>
        <button type="submit" className="btn">
          Add Pizza
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pizzas.map((pizza) => (
          <li
            key={pizza.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span style={{ minWidth: 100, fontWeight: 500 }}>{pizza.name}</span>
            <span style={{ fontSize: 12, color: "#888" }}>
              {pizza.ingredients}
            </span>
            <span style={{ marginLeft: 8 }}>{pizza.price}$</span>
            <button
              type="button"
              className="btn"
              style={{ padding: "2px 8px", fontSize: 12 }}
              onClick={() => toggleSoldOut(pizza.name)}
            >
              {pizza.soldOut ? "Mark Available" : "Mark Sold Out"}
            </button>
            <button
              type="button"
              className="btn"
              style={{
                padding: "2px 8px",
                fontSize: 12,
                background: "#f66",
                color: "#fff",
              }}
              onClick={() => deletePizza(pizza.name)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <>
      {" "}
      <p className="footer"> All rights reserved &#169;</p>{" "}
      <Order openHour={"8:00"} closeHour={"13:00"} />
    </>
  );
}
function Menu({ pizzas }) {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzas.length > 0 ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>We are still working on our pizzas. Please come back later!</p>
      )}
    </main>
  );
}
function Pizza({ pizzaObj }) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""} `}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name} </h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "Sold Out" : pizzaObj.price + "$"}</span>
      </div>
      {/* <h1>{props.pizzaObj.soldOut ? "soldOut" :"available" }</h1> */}
    </li>
  );
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We are open from {openHour}:00 until {closeHour}:00. Come visit or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
