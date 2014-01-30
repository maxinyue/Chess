package cn.maxinyue.chess.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by Obama on 14-1-30.
 */
@Entity
@XmlRootElement
public class Chess {
    @Column
    @Id
    private String id;
    @Column
    private String text;
    @Column
    private String color;
    @Column
    private String value;
    @Column
    private boolean obverse;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public boolean isObverse() {
        return obverse;
    }

    public void setObverse(boolean obverse) {
        this.obverse = obverse;
    }
}
