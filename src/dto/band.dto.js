class BandDto{
  cancion_id;
  nombre_album;
  nombre_tema;
  preview_url;
  fecha_lanzamiento;
  precio;


  constructor(cancion_id, nombre_album, nombre_tema, preview_url, fecha_lanzamiento, precio) {
    this.cancion_id = cancion_id;
    this.nombre_album = nombre_album;
    this.nombre_tema = nombre_tema;
    this.preview_url = preview_url;
    this.fecha_lanzamiento = fecha_lanzamiento;
    this.precio = precio;
  }
}

class PrecioDto{

  constructor(valor, moneda) {
    this._valor = valor;
    this._moneda = moneda;
  }

  get valor() {
    return this._valor;
  }

  get moneda() {
    return this._moneda;
  }
}

class SearchResponseDto{
  total_albumes;
  total_canciones;
  albumes;
  canciones;

  constructor(total_albumes, total_canciones, albumes, canciones) {
    this.total_albumes = total_albumes;
    this.total_canciones = total_canciones;
    this.albumes = albumes;
    this.canciones = canciones;
  }
}


class FavoritoDto{
  usuario;
  favoritos = [];
}

class FavoritoRequestDto{
  nombre_banda;
  cancion_id;
  usuario;
  ranking;

  constructor(nombre_banda, cancion_id, usuario, ranking) {
    this.nombre_banda = nombre_banda;
    this.cancion_id = cancion_id;
    this.usuario = usuario;
    this.ranking = ranking;
  }
}


module.exports = {
  FavoritoDto,
  FavoritoRequestDto,
  SearchResponseDto,
  PrecioDto,
  BandDto,
};
