import { LitElement, html, css } from "https://esm.sh/lit@2";
import { theNames } from "./theNames.js";

class BirthdayApp extends LitElement {
  static properties = {
    filters: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(
        135deg,
        #667eea 0%,
        #764ba2 12.5%,
        #f093fb 25%,
        #4facfe 37.5%,
        #00f2fe 50%,
        #43e97b 62.5%,
        #38f9d7 75%,
        #667eea 87.5%,
        #764ba2 100%
      );
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
      font-family: "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
      color: #222;
      padding: 2rem 0;
      position: relative;
    }

    @keyframes gradientShift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .search-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37),
        0 0 20px rgba(255, 255, 255, 0.2);
      padding: 1.5rem 2rem;
      align-items: center;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
      border: 2px solid rgba(255, 255, 255, 0.18);
      animation: searchBarFloat 3s ease-in-out infinite;
    }

    @keyframes searchBarFloat {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }

    input,
    select,
    button {
      padding: 0.7rem 1rem;
      font-size: 1.08rem;
      border-radius: 10px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(5px);
      color: #fff;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    input:focus,
    select:focus {
      outline: none;
      border: 2px solid rgba(255, 255, 255, 0.8);
      background: rgba(255, 255, 255, 0.35);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
        0 4px 15px rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
    }

    select {
      color: #fff;
      cursor: pointer;
    }

    select option {
      background: #667eea;
      color: #fff;
    }

    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border: 2px solid rgba(255, 255, 255, 0.5);
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
      position: relative;
      overflow: hidden;
    }

    button::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      transition: left 0.5s;
    }

    button:hover::before {
      left: 100%;
    }

    button:hover {
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.7);
    }

    button:active {
      transform: translateY(0) scale(1);
    }

    .person {
      margin-bottom: 1.5rem;
      padding: 1.5rem 2rem;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37),
        0 0 15px rgba(255, 255, 255, 0.2);
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      font-size: 1.13rem;
      line-height: 1.6;
      border-left: 6px solid;
      border-image: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe)
        1;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      animation: personEntrance 0.6s ease-out backwards;
      position: relative;
      overflow: hidden;
    }

    .person::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.6s;
    }

    .person:hover::before {
      left: 100%;
    }

    @keyframes personEntrance {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .person:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 12px 40px rgba(31, 38, 135, 0.5),
        0 0 25px rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.35);
    }

    .person strong {
      font-size: 1.3rem;
      background: linear-gradient(135deg, #fff 0%, #f093fb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
      display: inline-block;
      transition: all 0.3s ease;
    }

    .person:hover strong {
      transform: scale(1.05);
    }

    .comment {
      margin-top: 0.5rem;
      color: rgba(255, 255, 255, 0.95);
      font-style: italic;
      font-size: 1.05rem;
      word-break: break-word;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      background: rgba(255, 255, 255, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      display: inline-block;
    }

    @media (max-width: 600px) {
      .search-bar,
      .person {
        padding: 1rem 1rem;
      }

      .search-bar {
        padding: 1.2rem 1.5rem;
      }
    }
  `;

  constructor() {
    super();
    this.filters = {
      firstName: "",
      lastName: "",
      birthMonth: "",
      birthDay: "",
      birthYear: "",
      group: "",
      passedAway: false,
    };
  }

  updateFilter(field, value) {
    this.filters = { ...this.filters, [field]: value };
  }

  togglePassedAway(e) {
    this.filters = { ...this.filters, passedAway: e.target.checked };
  }

  get filteredPeople() {
    return theNames
      .filter((p) => {
        const fn = this.filters.firstName.toLowerCase();
        const ln = this.filters.lastName.toLowerCase();
        const bm = this.filters.birthMonth.toLowerCase();
        const bd = this.filters.birthDay;
        const by = this.filters.birthYear;
        const group = this.filters.group.toLowerCase();

        return (
          (!fn || p.firstName.toLowerCase().startsWith(fn)) &&
          (!ln || p.lastName.toLowerCase().startsWith(ln)) &&
          (!bm ||
            bm === "all months" ||
            (p.birthMonth && p.birthMonth.toLowerCase() === bm)) &&
          (!bd || p.birthDay == bd) &&
          (!by || p.birthYear == by) &&
          (!group || (p.group && p.group.toLowerCase() === group))
        );
      })
      .sort((a, b) => {
        const last = a.lastName.localeCompare(b.lastName);
        if (last !== 0) return last;
        return a.firstName.localeCompare(b.firstName);
      });
  }

  getMonthCounts() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const counts = {};
    let totalWithBirthdays = 0;

    months.forEach((month) => {
      counts[month] = theNames.filter(
        (p) =>
          p.birthMonth && p.birthMonth.toLowerCase() === month.toLowerCase()
      ).length;
    });

    // Only count entries that have a valid month name
    totalWithBirthdays = theNames.filter(
      (p) =>
        p.birthMonth &&
        months.some(
          (month) => month.toLowerCase() === p.birthMonth.toLowerCase()
        )
    ).length;

    return { counts, totalWithBirthdays };
  }

  getUniqueGroups() {
    const groups = new Set();
    theNames.forEach((person) => {
      if (person.group && person.group.trim() !== "") {
        groups.add(person.group);
      }
    });
    return Array.from(groups).sort();
  }

  clearFilters() {
    this.filters = {
      firstName: "",
      lastName: "",
      birthMonth: "",
      birthDay: "",
      birthYear: "",
      group: "",
    };
  }

  render() {
    // Determine if any filter is active (not empty or checked)
    const anyFilterActive = Object.entries(this.filters).some(
      ([key, value]) => {
        if (key === "passedAway") return value === true;
        return value && value !== "";
      }
    );
    return html`
      <div class="search-bar">
        <input
          placeholder="First Name"
          .value=${this.filters.firstName}
          @input=${(e) => this.updateFilter("firstName", e.target.value)}
        />
        <input
          placeholder="Last Name"
          .value=${this.filters.lastName}
          @input=${(e) => this.updateFilter("lastName", e.target.value)}
        />

        <select @change=${(e) => this.updateFilter("group", e.target.value)}>
          <option value="" ?selected=${!this.filters.group}>-- Group --</option>
          ${this.getUniqueGroups().map(
            (group) => html`
              <option
                value=${group.toLowerCase()}
                ?selected=${this.filters.group.toLowerCase() ===
                group.toLowerCase()}
              >
                ${group}
              </option>
            `
          )}
        </select>

        <select
          @change=${(e) => this.updateFilter("birthMonth", e.target.value)}
        >
          <option value="" ?selected=${!this.filters.birthMonth}>
            -- Month --
          </option>
          <option
            value="all months"
            ?selected=${this.filters.birthMonth.toLowerCase() === "all months"}
          >
            All Months (${this.getMonthCounts().totalWithBirthdays})
          </option>
          ${[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => {
            const count = this.getMonthCounts().counts[month];
            return html`
              <option
                value=${month.toLowerCase()}
                ?selected=${this.filters.birthMonth.toLowerCase() ===
                month.toLowerCase()}
              >
                ${month} (${count})
              </option>
            `;
          })}
        </select>

        <input
          type="number"
          placeholder="Day"
          .value=${this.filters.birthDay}
          @input=${(e) => this.updateFilter("birthDay", e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          .value=${this.filters.birthYear}
          @input=${(e) => this.updateFilter("birthYear", e.target.value)}
        />

        <button @click=${this.clearFilters}>Clear</button>
      </div>

      ${anyFilterActive
        ? html`
            <div
              style="margin-bottom: 1.5rem; font-weight: 600; color: white; text-shadow: 2px 2px 8px rgba(0,0,0,0.3); font-size: 1.2rem; background: rgba(255,255,255,0.2); padding: 0.8rem 1.5rem; border-radius: 15px; display: inline-block; backdrop-filter: blur(10px); box-shadow: 0 4px 15px rgba(0,0,0,0.2);"
            >
              🎉 ${this.filteredPeople.length}
              result${this.filteredPeople.length !== 1 ? "s" : ""} found 🎉
            </div>
            ${this.filteredPeople.length === 0
              ? html`<div
                  style="color: white; font-size: 1.2rem; text-shadow: 2px 2px 8px rgba(0,0,0,0.3); padding: 2rem; background: rgba(255,255,255,0.2); border-radius: 15px; backdrop-filter: blur(10px);"
                >
                  No results found. 🎂
                </div>`
              : ""}
            ${this.filteredPeople.map(
              (person, index) => html`
                <div class="person" style="animation-delay: ${index * 0.1}s;">
                  <strong>${person.firstName} ${person.lastName}</strong><br />
                  🎂 Born: ${person.birthMonth || "-"} ${person.birthDay || ""},
                  ${person.birthYear || "-"}<br />
                  ${person.passedAway
                    ? html`<span
                          style="color: rgba(255,255,255,0.9); display: block; margin-top: 0.5rem;"
                        >
                          🕊️ Passed Away: ${person.passedAway} --- RIP
                          ${person.firstName} ${person.lastName} </span
                        ><br />`
                    : ""}
                  ${person.comment
                    ? html`<div class="comment">💬 ${person.comment}</div>`
                    : ""}
                </div>
              `
            )}
          `
        : ""}
    `;
  }
}

customElements.define("birthday-app", BirthdayApp);
