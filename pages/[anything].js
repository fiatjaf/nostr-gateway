export async function getServerSideProps(context) {
  return {
    redirect: {destination: `/e/${context.params.anything}`, permanent: false}
  }
}

export default function AnyPage() {
  return null
}
