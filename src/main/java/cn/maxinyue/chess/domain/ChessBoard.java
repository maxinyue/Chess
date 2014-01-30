package cn.maxinyue.chess.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by Obama on 14-1-31.
 */
@Entity
@XmlRootElement
public class ChessBoard {
    @Id
    @Column
    private String id;
    @Column
    private int horizonNumber;
    @Column
    private int verticalNumber;
    @Column
    private int spacing;
    @Column
    private int padding;
    @Column
    private int x;
    @Column
    private int y;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getHorizonNumber() {
        return horizonNumber;
    }

    public void setHorizonNumber(int horizonNumber) {
        this.horizonNumber = horizonNumber;
    }

    public int getVerticalNumber() {
        return verticalNumber;
    }

    public void setVerticalNumber(int verticalNumber) {
        this.verticalNumber = verticalNumber;
    }

    public int getSpacing() {
        return spacing;
    }

    public void setSpacing(int spacing) {
        this.spacing = spacing;
    }

    public int getPadding() {
        return padding;
    }

    public void setPadding(int padding) {
        this.padding = padding;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
}
