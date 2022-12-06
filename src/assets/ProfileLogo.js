function ProfileLogo({ profileImageUrl }) {
  console.log({ profileImageUrl });
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="40" height="40" rx="20" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_83_8708" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_83_8708"
          width="200"
          height="200"
          xlinkHref={profileImageUrl}
        />
      </defs>
    </svg>
  );
}

export default ProfileLogo;
