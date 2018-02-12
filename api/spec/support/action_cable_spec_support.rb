module ActionCableSpecSupport
  def stream_id_for(record)
    "#{record.class.to_s.downcase}:#{record.to_gid_param}"
  end
end
