define([
  "app",
  "underscore",
  "backbone-plugins",
  "uuid"
], function(Komanda, _, Backbone, uuid) {

  var Channel = Backbone.Model.extend({
    idAttribute: "channel",

    defaults: {
      channel: "",
      name: "",
      topic: "",
      names: "",
      server: "",
      modes: "",
      uuid: uuid.v4(),
      selected: false,
      status: false,
      pm: false
    },

    initialize: function() {
      this.messages_id = "#messages-"+this.get("server")+"-"+(this.get("status") ? "status" : this.get("channel").replace(/\#+/, "komanda-"));
    },

    onClose: function() {
    },

    select: function() {
      console.log(this);
    },

    removeChannel: function(channel, server) {
      var self = this;
      var chan = $("li.channel-item[data-server-id=\"" + server + "\"][data-name=\"" + channel + "\"]");

      if (Komanda.current && Komanda.current.channel !== channel) {
        $("li.channel-item[data-server-id=\"" + Komanda.current.server + "\"][data-name=\"" + Komanda.current.channel + "\"]").click();
      } else {
        if (chan.prev("li.channel-item").length > 0) {
          chan.prev("li.channel-item").click();
        } else if (chan.next("li.channel-item").length > 0) {
          chan.next("li.channel-item").click();
        } else {
          chan.parents(".session").find("li.channel-item:first").click();
        }
      }


      chan.remove();
      $(".channel-holder div.channel[data-server-id=\"" + server + "\"][data-name=\"" + channel + "\"]").remove();
    }
  });

  Channel.isChannel = function(chan) {
    return _.isString(chan) && /^[#&]/.test(chan);
  };

  return Channel;
});
