const getNamespacedClaim = (object, key) =>
	object[
		Object.keys(object).find((objKey) => objKey === `${process.env.AUTH_CUSTOM_CLAIMS_NS}${key}`)
	];

export default getNamespacedClaim;
