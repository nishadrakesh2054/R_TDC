(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  // src/admin/GameSelect.js
  const GameSelect = props => {
    const [games, setGames] = React.useState([]);
    const [selectedGame, setSelectedGame] = React.useState(null);
    React.useEffect(() => {
      fetch("/api/games").then(response => response.json()).then(data => {
        const gameOptions = data.map(game => ({
          value: game.id.toString(),
          label: `${game.name} - ${game.category}`
        }));
        setGames(gameOptions);
      }).catch(error => console.error("Error fetching games:", error));
    }, []);
    React.useEffect(() => {
      if (props.value) {
        const game = games.find(g => g.value === props.value.toString());
        setSelectedGame(game || null);
      }
    }, [props.value, games]);
    const handleChange = selectedOption => {
      setSelectedGame(selectedOption);
      if (props.onChange) {
        const value = selectedOption ? selectedOption.value : null;
        props.onChange(value);
      }
    };

    // In GameSelect component
    console.log('Selected game:', selectedGame);

    // In 'before' hooks
    console.log('Request payload:', request.payload);
    return /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      ...props,
      options: games,
      onChange: handleChange,
      value: selectedGame,
      isClearable: true,
      placeholder: "Select a game..."
    });
  };

  const DownloadPDFButton = props => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const api = new adminjs.ApiClient();
    const handleDownload = async () => {
      try {
        const response = await api.resourceAction({
          resourceId: "Participations",
          actionName: "generatePDF",
          data: {
            startDate,
            endDate
          }
        });
        if (response.data.url) {
          window.open(response.data.url, "_blank");
        } else {
          console.error("No URL returned from the server");
        }
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.DatePicker, {
      value: startDate,
      onChange: date => setStartDate(date)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.DatePicker, {
      value: endDate,
      onChange: date => setEndDate(date)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleDownload
    }, "Generate PDF"));
  };

  const GenerateCertificates = props => {
    const {
      record
    } = props;
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [pdfUrl, setPdfUrl] = React.useState(null);
    const handleGenerateCertificates = async () => {
      setIsGenerating(true);
      try {
        const response = await fetch(`/admin/api/resources/Certificate/records/${record.id}/generateCertificates`, {
          method: "POST"
        });
        const data = await response.json();
        if (data.msg) {
          alert(data.msg);
          // Use the filename returned from the server
          setPdfUrl(`/api/download-certificates/${data.pdfFilename}`);
        }
      } catch (error) {
        console.error("Error generating certificates:", error);
        alert("Failed to generate certificates");
      } finally {
        setIsGenerating(false);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H2, null, "Generate Certificates"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Click the button below to generate certificates using the uploaded Excel file."), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleGenerateCertificates,
      disabled: isGenerating
    }, isGenerating ? "Generating..." : "Generate Certificates"), pdfUrl && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Certificates generated successfully!"), /*#__PURE__*/React__default.default.createElement(designSystem.Link, {
      href: pdfUrl,
      target: "_blank"
    }, "Download Certificates (PDF)")));
  };

  const ResumeDownloadButton = ({
    record
  }) => {
    const resumeUrl = record.params.resumeUrl;
    if (!resumeUrl) return /*#__PURE__*/React__default.default.createElement("span", null, "No resume uploaded");
    return /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      as: "a",
      href: resumeUrl,
      download: true,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Download Resume");
  };

  const Edit = ({ property, record, onChange }) => {
      const { translateProperty } = adminjs.useTranslation();
      const { params } = record;
      const { custom } = property;
      const path = adminjs.flat.get(params, custom.filePathProperty);
      const key = adminjs.flat.get(params, custom.keyProperty);
      const file = adminjs.flat.get(params, custom.fileProperty);
      const [originalKey, setOriginalKey] = React.useState(key);
      const [filesToUpload, setFilesToUpload] = React.useState([]);
      React.useEffect(() => {
          // it means means that someone hit save and new file has been uploaded
          // in this case fliesToUpload should be cleared.
          // This happens when user turns off redirect after new/edit
          if ((typeof key === 'string' && key !== originalKey)
              || (typeof key !== 'string' && !originalKey)
              || (typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length)) {
              setOriginalKey(key);
              setFilesToUpload([]);
          }
      }, [key, originalKey]);
      const onUpload = (files) => {
          setFilesToUpload(files);
          onChange(custom.fileProperty, files);
      };
      const handleRemove = () => {
          onChange(custom.fileProperty, null);
      };
      const handleMultiRemove = (singleKey) => {
          const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
          const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
          if (path && path.length > 0) {
              const newPath = path.map((currentPath, i) => (i !== index ? currentPath : null));
              let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
              newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
              onChange({
                  ...record,
                  params: newParams,
              });
          }
          else {
              // eslint-disable-next-line no-console
              console.log('You cannot remove file when there are no uploaded files yet');
          }
      };
      return (React__default.default.createElement(designSystem.FormGroup, null,
          React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
          React__default.default.createElement(designSystem.DropZone, { onChange: onUpload, multiple: custom.multiple, validate: {
                  mimeTypes: custom.mimeTypes,
                  maxSize: custom.maxSize,
              }, files: filesToUpload }),
          !custom.multiple && key && path && !filesToUpload.length && file !== null && (React__default.default.createElement(designSystem.DropZoneItem, { filename: key, src: path, onRemove: handleRemove })),
          custom.multiple && key && key.length && path ? (React__default.default.createElement(React__default.default.Fragment, null, key.map((singleKey, index) => {
              // when we remove items we set only path index to nulls.
              // key is still there. This is because
              // we have to maintain all the indexes. So here we simply filter out elements which
              // were removed and display only what was left
              const currentPath = path[index];
              return currentPath ? (React__default.default.createElement(designSystem.DropZoneItem, { key: singleKey, filename: singleKey, src: path[index], onRemove: () => handleMultiRemove(singleKey) })) : '';
          }))) : ''));
  };

  const AudioMimeTypes = [
      'audio/aac',
      'audio/midi',
      'audio/x-midi',
      'audio/mpeg',
      'audio/ogg',
      'application/ogg',
      'audio/opus',
      'audio/wav',
      'audio/webm',
      'audio/3gpp2',
  ];
  const ImageMimeTypes = [
      'image/bmp',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/vnd.microsoft.icon',
      'image/tiff',
      'image/webp',
  ];

  // eslint-disable-next-line import/no-extraneous-dependencies
  const SingleFile = (props) => {
      const { name, path, mimeType, width } = props;
      if (path && path.length) {
          if (mimeType && ImageMimeTypes.includes(mimeType)) {
              return (React__default.default.createElement("img", { src: path, style: { maxHeight: width, maxWidth: width }, alt: name }));
          }
          if (mimeType && AudioMimeTypes.includes(mimeType)) {
              return (React__default.default.createElement("audio", { controls: true, src: path },
                  "Your browser does not support the",
                  React__default.default.createElement("code", null, "audio"),
                  React__default.default.createElement("track", { kind: "captions" })));
          }
      }
      return (React__default.default.createElement(designSystem.Box, null,
          React__default.default.createElement(designSystem.Button, { as: "a", href: path, ml: "default", size: "sm", rounded: true, target: "_blank" },
              React__default.default.createElement(designSystem.Icon, { icon: "DocumentDownload", color: "white", mr: "default" }),
              name)));
  };
  const File = ({ width, record, property }) => {
      const { custom } = property;
      let path = adminjs.flat.get(record?.params, custom.filePathProperty);
      if (!path) {
          return null;
      }
      const name = adminjs.flat.get(record?.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
      const mimeType = custom.mimeTypeProperty
          && adminjs.flat.get(record?.params, custom.mimeTypeProperty);
      if (!property.custom.multiple) {
          if (custom.opts && custom.opts.baseUrl) {
              path = `${custom.opts.baseUrl}/${name}`;
          }
          return (React__default.default.createElement(SingleFile, { path: path, name: name, width: width, mimeType: mimeType }));
      }
      if (custom.opts && custom.opts.baseUrl) {
          const baseUrl = custom.opts.baseUrl || '';
          path = path.map((singlePath, index) => `${baseUrl}/${name[index]}`);
      }
      return (React__default.default.createElement(React__default.default.Fragment, null, path.map((singlePath, index) => (React__default.default.createElement(SingleFile, { key: singlePath, path: singlePath, name: name[index], width: width, mimeType: mimeType[index] })))));
  };

  const List = (props) => (React__default.default.createElement(File, { width: 100, ...props }));

  const Show = (props) => {
      const { property } = props;
      const { translateProperty } = adminjs.useTranslation();
      return (React__default.default.createElement(designSystem.FormGroup, null,
          React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
          React__default.default.createElement(File, { width: "100%", ...props })));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.GameSelect = GameSelect;
  AdminJS.UserComponents.downloadPDF = DownloadPDFButton;
  AdminJS.UserComponents.GenerateCertificates = GenerateCertificates;
  AdminJS.UserComponents.ResumeDownloadButton = ResumeDownloadButton;
  AdminJS.UserComponents.UploadEditComponent = Edit;
  AdminJS.UserComponents.UploadListComponent = List;
  AdminJS.UserComponents.UploadShowComponent = Show;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vR2FtZVNlbGVjdC5qcyIsIi4uL3NyYy9hZG1pbi9kb3dubG9hZGJ0bi5qc3giLCIuLi9zcmMvYWRtaW4vR2VuZXJhdGVDZXJ0aWZpY2F0ZXMuanN4IiwiLi4vc3JjL2FkbWluL1Jlc3VtZURvd25sb2FkQnV0dG9uLmpzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZmlsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRMaXN0Q29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQuanMiLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvYWRtaW4vR2FtZVNlbGVjdC5qc1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XG5cbmNvbnN0IEdhbWVTZWxlY3QgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgW2dhbWVzLCBzZXRHYW1lc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZEdhbWUsIHNldFNlbGVjdGVkR2FtZV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoKFwiL2FwaS9nYW1lc1wiKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lT3B0aW9ucyA9IGRhdGEubWFwKChnYW1lKSA9PiAoe1xuICAgICAgICAgIHZhbHVlOiBnYW1lLmlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgbGFiZWw6IGAke2dhbWUubmFtZX0gLSAke2dhbWUuY2F0ZWdvcnl9YCxcbiAgICAgICAgfSkpO1xuICAgICAgICBzZXRHYW1lcyhnYW1lT3B0aW9ucyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGdhbWVzOlwiLCBlcnJvcikpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocHJvcHMudmFsdWUpIHtcbiAgICAgIGNvbnN0IGdhbWUgPSBnYW1lcy5maW5kKGcgPT4gZy52YWx1ZSA9PT0gcHJvcHMudmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICBzZXRTZWxlY3RlZEdhbWUoZ2FtZSB8fCBudWxsKTtcbiAgICB9XG4gIH0sIFtwcm9wcy52YWx1ZSwgZ2FtZXNdKTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoc2VsZWN0ZWRPcHRpb24pID0+IHtcblx0c2V0U2VsZWN0ZWRHYW1lKHNlbGVjdGVkT3B0aW9uKTtcblx0aWYgKHByb3BzLm9uQ2hhbmdlKSB7XG5cdCAgY29uc3QgdmFsdWUgPSBzZWxlY3RlZE9wdGlvbiA/IHNlbGVjdGVkT3B0aW9uLnZhbHVlIDogbnVsbDtcblx0ICBwcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG5cdH1cbiAgfTtcblxuICAvLyBJbiBHYW1lU2VsZWN0IGNvbXBvbmVudFxuY29uc29sZS5sb2coJ1NlbGVjdGVkIGdhbWU6Jywgc2VsZWN0ZWRHYW1lKTtcblxuLy8gSW4gJ2JlZm9yZScgaG9va3NcbmNvbnNvbGUubG9nKCdSZXF1ZXN0IHBheWxvYWQ6JywgcmVxdWVzdC5wYXlsb2FkKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtcbiAgICAuLi5wcm9wcyxcbiAgICBvcHRpb25zOiBnYW1lcyxcbiAgICBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLFxuICAgIHZhbHVlOiBzZWxlY3RlZEdhbWUsXG4gICAgaXNDbGVhcmFibGU6IHRydWUsXG4gICAgcGxhY2Vob2xkZXI6IFwiU2VsZWN0IGEgZ2FtZS4uLlwiXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZVNlbGVjdDsiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBEYXRlUGlja2VyIH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gXCJhZG1pbmpzXCI7XG5cbmNvbnN0IERvd25sb2FkUERGQnV0dG9uID0gKHByb3BzKSA9PiB7XG5cdGNvbnN0IFtzdGFydERhdGUsIHNldFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpKTtcblx0Y29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGUobmV3IERhdGUoKSk7XG5cdGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuXHRjb25zdCBoYW5kbGVEb3dubG9hZCA9IGFzeW5jICgpID0+IHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xuXHRcdFx0XHRyZXNvdXJjZUlkOiBcIlBhcnRpY2lwYXRpb25zXCIsXG5cdFx0XHRcdGFjdGlvbk5hbWU6IFwiZ2VuZXJhdGVQREZcIixcblx0XHRcdFx0ZGF0YTogeyBzdGFydERhdGUsIGVuZERhdGUgfSxcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAocmVzcG9uc2UuZGF0YS51cmwpIHtcblx0XHRcdFx0d2luZG93Lm9wZW4ocmVzcG9uc2UuZGF0YS51cmwsIFwiX2JsYW5rXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIk5vIFVSTCByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2ZXJcIik7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZW5lcmF0aW5nIFBERjpcIiwgZXJyb3IpO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gKFxuXHRcdDxCb3g+XG5cdFx0XHQ8RGF0ZVBpY2tlclxuXHRcdFx0XHR2YWx1ZT17c3RhcnREYXRlfVxuXHRcdFx0XHRvbkNoYW5nZT17KGRhdGUpID0+IHNldFN0YXJ0RGF0ZShkYXRlKX1cblx0XHRcdC8+XG5cdFx0XHQ8RGF0ZVBpY2tlciB2YWx1ZT17ZW5kRGF0ZX0gb25DaGFuZ2U9eyhkYXRlKSA9PiBzZXRFbmREYXRlKGRhdGUpfSAvPlxuXHRcdFx0PEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZH0+R2VuZXJhdGUgUERGPC9CdXR0b24+XG5cdFx0PC9Cb3g+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEb3dubG9hZFBERkJ1dHRvbjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQm94LCBIMiwgVGV4dCwgQnV0dG9uLCBMaW5rIH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcblxuY29uc3QgR2VuZXJhdGVDZXJ0aWZpY2F0ZXMgPSAocHJvcHMpID0+IHtcblx0Y29uc3QgeyByZWNvcmQgfSA9IHByb3BzO1xuXHRjb25zdCBbaXNHZW5lcmF0aW5nLCBzZXRJc0dlbmVyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXHRjb25zdCBbcGRmVXJsLCBzZXRQZGZVcmxdID0gdXNlU3RhdGUobnVsbCk7XG5cblx0Y29uc3QgaGFuZGxlR2VuZXJhdGVDZXJ0aWZpY2F0ZXMgPSBhc3luYyAoKSA9PiB7XG5cdFx0c2V0SXNHZW5lcmF0aW5nKHRydWUpO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0XHRgL2FkbWluL2FwaS9yZXNvdXJjZXMvQ2VydGlmaWNhdGUvcmVjb3Jkcy8ke3JlY29yZC5pZH0vZ2VuZXJhdGVDZXJ0aWZpY2F0ZXNgLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRpZiAoZGF0YS5tc2cpIHtcblx0XHRcdFx0YWxlcnQoZGF0YS5tc2cpO1xuXHRcdFx0XHQvLyBVc2UgdGhlIGZpbGVuYW1lIHJldHVybmVkIGZyb20gdGhlIHNlcnZlclxuXHRcdFx0XHRzZXRQZGZVcmwoYC9hcGkvZG93bmxvYWQtY2VydGlmaWNhdGVzLyR7ZGF0YS5wZGZGaWxlbmFtZX1gKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIGdlbmVyYXRpbmcgY2VydGlmaWNhdGVzOlwiLCBlcnJvcik7XG5cdFx0XHRhbGVydChcIkZhaWxlZCB0byBnZW5lcmF0ZSBjZXJ0aWZpY2F0ZXNcIik7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdHNldElzR2VuZXJhdGluZyhmYWxzZSk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiAoXG5cdFx0PEJveD5cblx0XHRcdDxIMj5HZW5lcmF0ZSBDZXJ0aWZpY2F0ZXM8L0gyPlxuXHRcdFx0PFRleHQ+XG5cdFx0XHRcdENsaWNrIHRoZSBidXR0b24gYmVsb3cgdG8gZ2VuZXJhdGUgY2VydGlmaWNhdGVzIHVzaW5nIHRoZVxuXHRcdFx0XHR1cGxvYWRlZCBFeGNlbCBmaWxlLlxuXHRcdFx0PC9UZXh0PlxuXHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZUNlcnRpZmljYXRlc31cblx0XHRcdFx0ZGlzYWJsZWQ9e2lzR2VuZXJhdGluZ31cblx0XHRcdD5cblx0XHRcdFx0e2lzR2VuZXJhdGluZyA/IFwiR2VuZXJhdGluZy4uLlwiIDogXCJHZW5lcmF0ZSBDZXJ0aWZpY2F0ZXNcIn1cblx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0e3BkZlVybCAmJiAoXG5cdFx0XHRcdDxCb3ggbXQ9XCJ4bFwiPlxuXHRcdFx0XHRcdDxUZXh0PkNlcnRpZmljYXRlcyBnZW5lcmF0ZWQgc3VjY2Vzc2Z1bGx5ITwvVGV4dD5cblx0XHRcdFx0XHQ8TGluayBocmVmPXtwZGZVcmx9IHRhcmdldD1cIl9ibGFua1wiPlxuXHRcdFx0XHRcdFx0RG93bmxvYWQgQ2VydGlmaWNhdGVzIChQREYpXG5cdFx0XHRcdFx0PC9MaW5rPlxuXHRcdFx0XHQ8L0JveD5cblx0XHRcdCl9XG5cdFx0PC9Cb3g+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHZW5lcmF0ZUNlcnRpZmljYXRlcztcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XG5cbmNvbnN0IFJlc3VtZURvd25sb2FkQnV0dG9uID0gKHsgcmVjb3JkIH0pID0+IHtcblx0Y29uc3QgcmVzdW1lVXJsID0gcmVjb3JkLnBhcmFtcy5yZXN1bWVVcmw7XG5cblx0aWYgKCFyZXN1bWVVcmwpIHJldHVybiA8c3Bhbj5ObyByZXN1bWUgdXBsb2FkZWQ8L3NwYW4+O1xuXG5cdHJldHVybiAoXG5cdFx0PEJ1dHRvblxuXHRcdFx0YXM9XCJhXCJcblx0XHRcdGhyZWY9e3Jlc3VtZVVybH1cblx0XHRcdGRvd25sb2FkXG5cdFx0XHR0YXJnZXQ9XCJfYmxhbmtcIlxuXHRcdFx0cmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG5cdFx0PlxuXHRcdFx0RG93bmxvYWQgUmVzdW1lXG5cdFx0PC9CdXR0b24+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXN1bWVEb3dubG9hZEJ1dHRvbjtcbiIsImltcG9ydCB7IERyb3Bab25lLCBEcm9wWm9uZUl0ZW0sIEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQsIHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmNvbnN0IEVkaXQgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XG4gICAgY29uc3QgeyB0cmFuc2xhdGVQcm9wZXJ0eSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkO1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBjb25zdCBwYXRoID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgY29uc3Qga2V5ID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IGZpbGUgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUHJvcGVydHkpO1xuICAgIGNvbnN0IFtvcmlnaW5hbEtleSwgc2V0T3JpZ2luYWxLZXldID0gdXNlU3RhdGUoa2V5KTtcbiAgICBjb25zdCBbZmlsZXNUb1VwbG9hZCwgc2V0RmlsZXNUb1VwbG9hZF0gPSB1c2VTdGF0ZShbXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gaXQgbWVhbnMgbWVhbnMgdGhhdCBzb21lb25lIGhpdCBzYXZlIGFuZCBuZXcgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgICAgICAvLyBpbiB0aGlzIGNhc2UgZmxpZXNUb1VwbG9hZCBzaG91bGQgYmUgY2xlYXJlZC5cbiAgICAgICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gdXNlciB0dXJucyBvZmYgcmVkaXJlY3QgYWZ0ZXIgbmV3L2VkaXRcbiAgICAgICAgaWYgKCh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkgIT09IG9yaWdpbmFsS2V5KVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmICFvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiBBcnJheS5pc0FycmF5KGtleSkgJiYga2V5Lmxlbmd0aCAhPT0gb3JpZ2luYWxLZXkubGVuZ3RoKSkge1xuICAgICAgICAgICAgc2V0T3JpZ2luYWxLZXkoa2V5KTtcbiAgICAgICAgICAgIHNldEZpbGVzVG9VcGxvYWQoW10pO1xuICAgICAgICB9XG4gICAgfSwgW2tleSwgb3JpZ2luYWxLZXldKTtcbiAgICBjb25zdCBvblVwbG9hZCA9IChmaWxlcykgPT4ge1xuICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKGZpbGVzKTtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgZmlsZXMpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU11bHRpUmVtb3ZlID0gKHNpbmdsZUtleSkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IChmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpIHx8IFtdKS5pbmRleE9mKHNpbmdsZUtleSk7XG4gICAgICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5KSB8fCBbXTtcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5tYXAoKGN1cnJlbnRQYXRoLCBpKSA9PiAoaSAhPT0gaW5kZXggPyBjdXJyZW50UGF0aCA6IG51bGwpKTtcbiAgICAgICAgICAgIGxldCBuZXdQYXJhbXMgPSBmbGF0LnNldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5LCBbLi4uZmlsZXNUb0RlbGV0ZSwgaW5kZXhdKTtcbiAgICAgICAgICAgIG5ld1BhcmFtcyA9IGZsYXQuc2V0KG5ld1BhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHksIG5ld1BhdGgpO1xuICAgICAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG5ld1BhcmFtcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2Fubm90IHJlbW92ZSBmaWxlIHdoZW4gdGhlcmUgYXJlIG5vIHVwbG9hZGVkIGZpbGVzIHlldCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCBudWxsLCB0cmFuc2xhdGVQcm9wZXJ0eShwcm9wZXJ0eS5sYWJlbCwgcHJvcGVydHkucmVzb3VyY2VJZCkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lLCB7IG9uQ2hhbmdlOiBvblVwbG9hZCwgbXVsdGlwbGU6IGN1c3RvbS5tdWx0aXBsZSwgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IGN1c3RvbS5taW1lVHlwZXMsXG4gICAgICAgICAgICAgICAgbWF4U2l6ZTogY3VzdG9tLm1heFNpemUsXG4gICAgICAgICAgICB9LCBmaWxlczogZmlsZXNUb1VwbG9hZCB9KSxcbiAgICAgICAgIWN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYgcGF0aCAmJiAhZmlsZXNUb1VwbG9hZC5sZW5ndGggJiYgZmlsZSAhPT0gbnVsbCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsgZmlsZW5hbWU6IGtleSwgc3JjOiBwYXRoLCBvblJlbW92ZTogaGFuZGxlUmVtb3ZlIH0pKSxcbiAgICAgICAgY3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBrZXkubGVuZ3RoICYmIHBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwga2V5Lm1hcCgoc2luZ2xlS2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSByZW1vdmUgaXRlbXMgd2Ugc2V0IG9ubHkgcGF0aCBpbmRleCB0byBudWxscy5cbiAgICAgICAgICAgIC8vIGtleSBpcyBzdGlsbCB0aGVyZS4gVGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIG1haW50YWluIGFsbCB0aGUgaW5kZXhlcy4gU28gaGVyZSB3ZSBzaW1wbHkgZmlsdGVyIG91dCBlbGVtZW50cyB3aGljaFxuICAgICAgICAgICAgLy8gd2VyZSByZW1vdmVkIGFuZCBkaXNwbGF5IG9ubHkgd2hhdCB3YXMgbGVmdFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoW2luZGV4XTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lSXRlbSwgeyBrZXk6IHNpbmdsZUtleSwgZmlsZW5hbWU6IHNpbmdsZUtleSwgc3JjOiBwYXRoW2luZGV4XSwgb25SZW1vdmU6ICgpID0+IGhhbmRsZU11bHRpUmVtb3ZlKHNpbmdsZUtleSkgfSkpIDogJyc7XG4gICAgICAgIH0pKSkgOiAnJykpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEVkaXQ7XG4iLCJleHBvcnQgY29uc3QgQXVkaW9NaW1lVHlwZXMgPSBbXG4gICAgJ2F1ZGlvL2FhYycsXG4gICAgJ2F1ZGlvL21pZGknLFxuICAgICdhdWRpby94LW1pZGknLFxuICAgICdhdWRpby9tcGVnJyxcbiAgICAnYXVkaW8vb2dnJyxcbiAgICAnYXBwbGljYXRpb24vb2dnJyxcbiAgICAnYXVkaW8vb3B1cycsXG4gICAgJ2F1ZGlvL3dhdicsXG4gICAgJ2F1ZGlvL3dlYm0nLFxuICAgICdhdWRpby8zZ3BwMicsXG5dO1xuZXhwb3J0IGNvbnN0IFZpZGVvTWltZVR5cGVzID0gW1xuICAgICd2aWRlby94LW1zdmlkZW8nLFxuICAgICd2aWRlby9tcGVnJyxcbiAgICAndmlkZW8vb2dnJyxcbiAgICAndmlkZW8vbXAydCcsXG4gICAgJ3ZpZGVvL3dlYm0nLFxuICAgICd2aWRlby8zZ3BwJyxcbiAgICAndmlkZW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBJbWFnZU1pbWVUeXBlcyA9IFtcbiAgICAnaW1hZ2UvYm1wJyxcbiAgICAnaW1hZ2UvZ2lmJyxcbiAgICAnaW1hZ2UvanBlZycsXG4gICAgJ2ltYWdlL3BuZycsXG4gICAgJ2ltYWdlL3N2Zyt4bWwnLFxuICAgICdpbWFnZS92bmQubWljcm9zb2Z0Lmljb24nLFxuICAgICdpbWFnZS90aWZmJyxcbiAgICAnaW1hZ2Uvd2VicCcsXG5dO1xuZXhwb3J0IGNvbnN0IENvbXByZXNzZWRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcDInLFxuICAgICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgICAnYXBwbGljYXRpb24vamF2YS1hcmNoaXZlJyxcbiAgICAnYXBwbGljYXRpb24veC10YXInLFxuICAgICdhcHBsaWNhdGlvbi96aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnLFxuXTtcbmV4cG9ydCBjb25zdCBEb2N1bWVudE1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24veC1hYml3b3JkJyxcbiAgICAnYXBwbGljYXRpb24veC1mcmVlYXJjJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vaycsXG4gICAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQucmFyJyxcbiAgICAnYXBwbGljYXRpb24vcnRmJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXTtcbmV4cG9ydCBjb25zdCBUZXh0TWltZVR5cGVzID0gW1xuICAgICd0ZXh0L2NzcycsXG4gICAgJ3RleHQvY3N2JyxcbiAgICAndGV4dC9odG1sJyxcbiAgICAndGV4dC9jYWxlbmRhcicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICdhcHBsaWNhdGlvbi9sZCtqc29uJyxcbiAgICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAndGV4dC9wbGFpbicsXG4gICAgJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3htbCcsXG4gICAgJ3RleHQveG1sJyxcbl07XG5leHBvcnQgY29uc3QgQmluYXJ5RG9jc01pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuICAgICdhcHBsaWNhdGlvbi9wZGYnLFxuXTtcbmV4cG9ydCBjb25zdCBGb250TWltZVR5cGVzID0gW1xuICAgICdmb250L290ZicsXG4gICAgJ2ZvbnQvdHRmJyxcbiAgICAnZm9udC93b2ZmJyxcbiAgICAnZm9udC93b2ZmMicsXG5dO1xuZXhwb3J0IGNvbnN0IE90aGVyTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICdhcHBsaWNhdGlvbi94LWNzaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5pbnN0YWxsZXIreG1sJyxcbiAgICAnYXBwbGljYXRpb24veC1odHRwZC1waHAnLFxuICAgICdhcHBsaWNhdGlvbi94LXNoJyxcbiAgICAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAgICd2bmQudmlzaW8nLFxuICAgICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJyxcbl07XG5leHBvcnQgY29uc3QgTWltZVR5cGVzID0gW1xuICAgIC4uLkF1ZGlvTWltZVR5cGVzLFxuICAgIC4uLlZpZGVvTWltZVR5cGVzLFxuICAgIC4uLkltYWdlTWltZVR5cGVzLFxuICAgIC4uLkNvbXByZXNzZWRNaW1lVHlwZXMsXG4gICAgLi4uRG9jdW1lbnRNaW1lVHlwZXMsXG4gICAgLi4uVGV4dE1pbWVUeXBlcyxcbiAgICAuLi5CaW5hcnlEb2NzTWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuICAgIC4uLkZvbnRNaW1lVHlwZXMsXG4gICAgLi4uT3RoZXJNaW1lVHlwZXMsXG5dO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBdWRpb01pbWVUeXBlcywgSW1hZ2VNaW1lVHlwZXMgfSBmcm9tICcuLi90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMnO1xuY29uc3QgU2luZ2xlRmlsZSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgcGF0aCwgbWltZVR5cGUsIHdpZHRoIH0gPSBwcm9wcztcbiAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgICAgICBpZiAobWltZVR5cGUgJiYgSW1hZ2VNaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHBhdGgsIHN0eWxlOiB7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9LCBhbHQ6IG5hbWUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIsIHsgY29udHJvbHM6IHRydWUsIHNyYzogcGF0aCB9LFxuICAgICAgICAgICAgICAgIFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlXCIsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCJhdWRpb1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJhY2tcIiwgeyBraW5kOiBcImNhcHRpb25zXCIgfSkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBhczogXCJhXCIsIGhyZWY6IHBhdGgsIG1sOiBcImRlZmF1bHRcIiwgc2l6ZTogXCJzbVwiLCByb3VuZGVkOiB0cnVlLCB0YXJnZXQ6IFwiX2JsYW5rXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiBcIkRvY3VtZW50RG93bmxvYWRcIiwgY29sb3I6IFwid2hpdGVcIiwgbXI6IFwiZGVmYXVsdFwiIH0pLFxuICAgICAgICAgICAgbmFtZSkpKTtcbn07XG5jb25zdCBGaWxlID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBsZXQgcGF0aCA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBuYW1lID0gZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5maWxlTmFtZVByb3BlcnR5ID8gY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgOiBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHlcbiAgICAgICAgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KTtcbiAgICBpZiAoIXByb3BlcnR5LmN1c3RvbS5tdWx0aXBsZSkge1xuICAgICAgICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgICAgICAgICAgcGF0aCA9IGAke2N1c3RvbS5vcHRzLmJhc2VVcmx9LyR7bmFtZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IHBhdGg6IHBhdGgsIG5hbWU6IG5hbWUsIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlIH0pKTtcbiAgICB9XG4gICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGN1c3RvbS5vcHRzLmJhc2VVcmwgfHwgJyc7XG4gICAgICAgIHBhdGggPSBwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IGAke2Jhc2VVcmx9LyR7bmFtZVtpbmRleF19YCk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IGtleTogc2luZ2xlUGF0aCwgcGF0aDogc2luZ2xlUGF0aCwgbmFtZTogbmFtZVtpbmRleF0sIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlW2luZGV4XSB9KSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRmlsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgTGlzdCA9IChwcm9wcykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogMTAwLCAuLi5wcm9wcyB9KSk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuIiwiaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgU2hvdyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgcHJvcGVydHkgfSA9IHByb3BzO1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGaWxlLCB7IHdpZHRoOiBcIjEwMCVcIiwgLi4ucHJvcHMgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaG93O1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgR2FtZVNlbGVjdCBmcm9tICcuLi9zcmMvYWRtaW4vR2FtZVNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuR2FtZVNlbGVjdCA9IEdhbWVTZWxlY3RcbmltcG9ydCBkb3dubG9hZFBERiBmcm9tICcuLi9zcmMvYWRtaW4vZG93bmxvYWRidG4nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLmRvd25sb2FkUERGID0gZG93bmxvYWRQREZcbmltcG9ydCBHZW5lcmF0ZUNlcnRpZmljYXRlcyBmcm9tICcuLi9zcmMvYWRtaW4vR2VuZXJhdGVDZXJ0aWZpY2F0ZXMnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkdlbmVyYXRlQ2VydGlmaWNhdGVzID0gR2VuZXJhdGVDZXJ0aWZpY2F0ZXNcbmltcG9ydCBSZXN1bWVEb3dubG9hZEJ1dHRvbiBmcm9tICcuLi9zcmMvYWRtaW4vUmVzdW1lRG93bmxvYWRCdXR0b24nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJlc3VtZURvd25sb2FkQnV0dG9uID0gUmVzdW1lRG93bmxvYWRCdXR0b25cbmltcG9ydCBVcGxvYWRFZGl0Q29tcG9uZW50IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRFZGl0Q29tcG9uZW50ID0gVXBsb2FkRWRpdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZExpc3RDb21wb25lbnQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZExpc3RDb21wb25lbnQgPSBVcGxvYWRMaXN0Q29tcG9uZW50XG5pbXBvcnQgVXBsb2FkU2hvd0NvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkU2hvd0NvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXBsb2FkU2hvd0NvbXBvbmVudCA9IFVwbG9hZFNob3dDb21wb25lbnQiXSwibmFtZXMiOlsiR2FtZVNlbGVjdCIsInByb3BzIiwiZ2FtZXMiLCJzZXRHYW1lcyIsInVzZVN0YXRlIiwic2VsZWN0ZWRHYW1lIiwic2V0U2VsZWN0ZWRHYW1lIiwidXNlRWZmZWN0IiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImdhbWVPcHRpb25zIiwibWFwIiwiZ2FtZSIsInZhbHVlIiwiaWQiLCJ0b1N0cmluZyIsImxhYmVsIiwibmFtZSIsImNhdGVnb3J5IiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJmaW5kIiwiZyIsImhhbmRsZUNoYW5nZSIsInNlbGVjdGVkT3B0aW9uIiwib25DaGFuZ2UiLCJsb2ciLCJyZXF1ZXN0IiwicGF5bG9hZCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIlNlbGVjdCIsIm9wdGlvbnMiLCJpc0NsZWFyYWJsZSIsInBsYWNlaG9sZGVyIiwiRG93bmxvYWRQREZCdXR0b24iLCJzdGFydERhdGUiLCJzZXRTdGFydERhdGUiLCJEYXRlIiwiZW5kRGF0ZSIsInNldEVuZERhdGUiLCJhcGkiLCJBcGlDbGllbnQiLCJoYW5kbGVEb3dubG9hZCIsInJlc291cmNlQWN0aW9uIiwicmVzb3VyY2VJZCIsImFjdGlvbk5hbWUiLCJ1cmwiLCJ3aW5kb3ciLCJvcGVuIiwiQm94IiwiRGF0ZVBpY2tlciIsImRhdGUiLCJCdXR0b24iLCJvbkNsaWNrIiwiR2VuZXJhdGVDZXJ0aWZpY2F0ZXMiLCJyZWNvcmQiLCJpc0dlbmVyYXRpbmciLCJzZXRJc0dlbmVyYXRpbmciLCJwZGZVcmwiLCJzZXRQZGZVcmwiLCJoYW5kbGVHZW5lcmF0ZUNlcnRpZmljYXRlcyIsIm1ldGhvZCIsIm1zZyIsImFsZXJ0IiwicGRmRmlsZW5hbWUiLCJIMiIsIlRleHQiLCJkaXNhYmxlZCIsIm10IiwiTGluayIsImhyZWYiLCJ0YXJnZXQiLCJSZXN1bWVEb3dubG9hZEJ1dHRvbiIsInJlc3VtZVVybCIsInBhcmFtcyIsImFzIiwiZG93bmxvYWQiLCJyZWwiLCJ1c2VUcmFuc2xhdGlvbiIsImZsYXQiLCJGb3JtR3JvdXAiLCJMYWJlbCIsIkRyb3Bab25lIiwiRHJvcFpvbmVJdGVtIiwiSWNvbiIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsImRvd25sb2FkUERGIiwiVXBsb2FkRWRpdENvbXBvbmVudCIsIlVwbG9hZExpc3RDb21wb25lbnQiLCJVcGxvYWRTaG93Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBQUE7RUFJQSxNQUFNQSxVQUFVLEdBQUlDLEtBQUssSUFBSztJQUM1QixNQUFNLENBQUNDLEtBQUssRUFBRUMsUUFBUSxDQUFDLEdBQUdDLGNBQVEsQ0FBQyxFQUFFLENBQUM7SUFDdEMsTUFBTSxDQUFDQyxZQUFZLEVBQUVDLGVBQWUsQ0FBQyxHQUFHRixjQUFRLENBQUMsSUFBSSxDQUFDO0VBRXRERyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNkQyxJQUFBQSxLQUFLLENBQUMs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
