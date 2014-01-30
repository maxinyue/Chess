package cn.maxinyue.chess.domain;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.websocket.*;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public abstract class JSONCoder<T> implements Encoder.TextStream<T>, Decoder.TextStream<T> {

    private Class<T> type;

    private ThreadLocal<ObjectMapper> mapper = new ThreadLocal<ObjectMapper>() {
        @Override
        protected ObjectMapper initialValue() {
            return new ObjectMapper();
        }
    };

    @Override
    public void encode(T object, Writer writer) throws EncodeException, IOException {
        mapper.get().writeValue(writer, object);
    }

    @Override
    public void init(EndpointConfig config) {
        ParameterizedType $thisClass = (ParameterizedType) this.getClass().getGenericSuperclass();
        Type $T = $thisClass.getActualTypeArguments()[0];
        if ($T instanceof Class) {
            type = (Class<T>) $T;
        } else if ($T instanceof ParameterizedType) {
            type = (Class<T>) ((ParameterizedType) $T).getRawType();
        }
    }

    @Override
    public void destroy() {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public T decode(Reader reader) throws DecodeException, IOException {
        return mapper.get().readValue(reader, type);
    }
}
