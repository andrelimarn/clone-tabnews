function status(request, response) {
  response.status(200).json({ chave: "André Lima" });
}

export default status;
