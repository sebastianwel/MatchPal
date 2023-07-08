export default function BarIcon({ isCurrent }) {
  return (
    <>
      {isCurrent ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M240-120v-60h210v-244L120-780v-60h720v60L510-424v244h210v60H240Zm41-575h398l83-81H198l83 81Zm199 216 144-156H336l144 156Zm0 0Z"
            fill="var(--isActive-color)"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M240-120v-60h210v-244L120-780v-60h720v60L510-424v244h210v60H240Zm41-575h398l83-81H198l83 81Zm199 216 144-156H336l144 156Zm0 0Z"
            fill="var(--isInactive-color)"
          />
        </svg>
      )}
    </>
  );
}
